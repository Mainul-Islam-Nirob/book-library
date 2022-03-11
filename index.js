let modal = document.getElementById("bookFormModal");
let addBookBtn = document.getElementById("addBook");
let modalCloseBtn = document.getElementById("closeBtn")
let modalForm = document.getElementById("modal-form");
let toggleRead = document.getElementById("toggle-read");
let removeBook = document.getElementById("remove-book");
let container = document.getElementById("container")


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

// let book1 = new Book("title", "author", "pages", true);

// console.log(book1.toggleRead(), book1);
// console.log(book1.toggleRead(), book1);
// console.log(book1.toggleRead(), book1);


function addBookToLibrary(title, author, pages, isRead) {
    let book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
}


function displayBook() {
    container.innerHTML = ""; //Removing all child elements of container before adding new book

    myLibrary.map((book) => {
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

        bookDetail.appendChild(title);
        bookDetail.appendChild(author);
        bookDetail.appendChild(pages);
        btnGroup.appendChild(readBtn);
        btnGroup.appendChild(removeBtn);
        bookCard.appendChild(bookDetail);
        bookCard.appendChild(btnGroup);
        


        // bookContainer.classList.add("book-card");
        // bookContainer.setAttribute("data-index", `${index}`)
        // bookContainer.innerHTML = `
        //                         <div class="book-detail">
        //                         <h1 class="title">${book.title}</h1>
        //                         <h3 class="author">by- ${book.author}</h3>
        //                         <h5 class="pages">${book.pages} Pages</h5>
        //                         </div>
        //                         <div class="btn-group">
        //                         <button class="btn" onClick="() => handleToggleRead('${book.toggleRead()}')" id="toggle-read">${book.isRead ? "Read" : "Not Read"}</button>
        //                         <button class="btn" onClick="handleRemoveBook('${book.id}')" id="remove-book">Remove</button>
        //                         </div>`;

        container.appendChild(bookCard);
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

function handleToggleRead(book) {
    console.log("toggle read", book);
    // book.toggleRead();
    // myLibrary.find(book => book.id == id)
    
}

function handleRemoveBook(id) {
    console.log("remove book", id);
    myLibrary = myLibrary.filter(book => book.id != id);
    displayBook();
}

window.addEventListener("load", displayBook);
addBookBtn.addEventListener("click", openModal)
modalCloseBtn.addEventListener("click", closeModal)
window.addEventListener("click", closeModalOnOutSideClick);
modalForm.addEventListener("submit", handleAddBook);









