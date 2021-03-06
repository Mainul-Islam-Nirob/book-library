const modal = document.getElementById("bookFormModal");
const addBookBtn = document.getElementById("addBook");
const modalCloseBtn = document.getElementById("closeBtn")
const modalForm = document.getElementById("modal-form");
const toggleRead = document.getElementById("toggle-read");
const removeBook = document.getElementById("remove-book");
const container = document.getElementById("container")

let myLibrary = [];

class Book{
    constructor(title, author, pages, isRead) {
        this.id = '_' + Math.random().toString(36).substring(2, 11);
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}


function addBookToLibrary(title, author, pages, isRead) {
    let book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
}

function createBookCard(book) {
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

function renderBooks() {
    resetBooks();
    myLibrary.map((book) => {
        createBookCard(book);
    })
}

function openModal() {
    modal.style.display = "flex";
}

//close modal after clicking close button
function closeModal() {
    modal.style.display = "none";
}

//close modal after clicking outside of the modal
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
    saveBook();
    modalForm.reset();
    closeModal();
    renderBooks();
}

function handleToggleRead(id) {
    let toggleBook = myLibrary.find(book => book.id == id);
    toggleBook.isRead = !toggleBook.isRead;
    saveBook();
    renderBooks();
}

function handleRemoveBook(id) {
    myLibrary = myLibrary.filter(book => book.id != id);
    saveBook();
    renderBooks();
}

// saving book in local storage
function saveBook() {
    localStorage.setItem("library", JSON.stringify(myLibrary));
}

//showing book from local storage
function displayBooks() {
    if (!localStorage.library) {
        renderBooks();
    } else {
        let books = localStorage.getItem("library");
        books = JSON.parse(books);
        myLibrary = books;
        renderBooks();
    }
}

window.addEventListener("load", displayBooks);
addBookBtn.addEventListener("click", openModal)
modalCloseBtn.addEventListener("click", closeModal)
window.addEventListener("click", closeModalOnOutSideClick);
modalForm.addEventListener("submit", handleAddBook);




