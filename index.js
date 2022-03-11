const modal = document.getElementById("bookFormModal");
const addBookBtn = document.getElementById("addBook");
const modalCloseBtn = document.getElementById("closeBtn")
const modalForm = document.getElementById("modal-form");
const toggleRead = document.getElementById("toggle-read");
const removeBook = document.getElementById("remove-book");
const container = document.getElementById("container")

let myLibrary = [];

function Book (title, author, pages, isRead) {
    this.id = '_' + Math.random().toString(36).substring(2, 11);
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
}

Book.prototype.toggleRead = function toggleRead() {
    this.isRead = !this.isRead;
}


function addBookToLibrary(title, author, pages, isRead) {
    let book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
}


function bookCard(book) {
    const bookCard = document.createElement("div");
    const bookDetail = document.createElement("div");
    const title = document.createElement("h1");
    const author = document.createElement("h3");
    const pages = document.createElement("h5");
    const btnGroup = document.createElement("div");
    const readBtn = document.createElement("button");
    const removeBtn = document.createElement("button");

    bookCard.classList.add("book-card");
    bookDetail.classList.add("book-detail");
    title.classList.add("title");
    author.classList.add("author");
    pages.classList.add("pages");
    btnGroup.classList.add("btn-group");
    readBtn.classList.add("btn");
    removeBtn.classList.add("btn");

    readBtn.setAttribute("id", "toggle-read");
    removeBtn.setAttribute("id", "remove-book");


    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = `${book.pages} Pages`;
    removeBtn.textContent = "Remove"

    if (book.isRead) {
        readBtn.textContent = "Read";
        readBtn.classList.add("read-btn");
    } else {
        readBtn.textContent = "Not Read";
        readBtn.classList.add("not-read-btn");
    }


    readBtn.addEventListener("click", () => handleToggleRead(book.id));
    removeBtn.addEventListener("click", () => handleRemoveBook(book.id));

    bookDetail.appendChild(title);
    bookDetail.appendChild(author);
    bookDetail.appendChild(pages);
    btnGroup.appendChild(readBtn);
    btnGroup.appendChild(removeBtn);
    bookCard.appendChild(bookDetail);
    bookCard.appendChild(btnGroup);

    container.appendChild(bookCard);
}


const resetBooks = () => {
    container.innerHTML = "";
}

function displayBook() {
    resetBooks();
    myLibrary.map((book) => {
        bookCard(book);
    })
}



function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

function closeModalOnOutSideClick(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}


function handleAddBook(e) {
    e.preventDefault();

    let title = e.target.title.value;
    let author = e.target.author.value;
    let pages = e.target.pages.value;
    let read = e.target.read.checked;

    addBookToLibrary(title, author, pages, read);
    modalForm.reset();
    closeModal();
    displayBook();
}

function handleToggleRead(id) {
    let toggleBook = myLibrary.find(book => book.id == id)
    toggleBook.toggleRead();
    displayBook();
    
}

function handleRemoveBook(id) {
    myLibrary = myLibrary.filter(book => book.id != id);
    displayBook();
}

window.addEventListener("load", displayBook);
addBookBtn.addEventListener("click", openModal)
modalCloseBtn.addEventListener("click", closeModal)
window.addEventListener("click", closeModalOnOutSideClick);
modalForm.addEventListener("submit", handleAddBook);









