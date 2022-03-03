let myLibrary = [];

function Book (title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${isRead ? "already read" : "not read yet"}`
    }
}

function addBookToLibrary(title, author, pages, isRead) {
    let book = new Book(title, author, pages, isRead);
    myLibrary.push(book);

}

addBookToLibrary("Clean Code", "Mainul", "299", true);
addBookToLibrary("Refactor Code", "Nirob", "192", false);
addBookToLibrary("Test Code", "Ridoy", "302", true);
addBookToLibrary("Test Code", "Ridoy", "302", true);
addBookToLibrary("Test Code", "Ridoy", "302", true);


function displayBook() {
    let container = document.getElementById("container")

    myLibrary.map(book => {
        let bookContainer = document.createElement("div");
        bookContainer.classList.add("book-card");
        bookContainer.innerHTML = `<h1 class="title">${book.title}</h1>
                                <h3 class="author">${book.author}</h3>
                                <h5 class="pages">${book.pages}</h5>
                                <p className="info">${book.info()}</p>`
        container.appendChild(bookContainer);
    })
}

displayBook();

//
let modal = document.getElementById("bookFormModal");
let addBookBtn = document.getElementById("addBook");
let modalCloseBtn = document.getElementById("closeBtn")

addBookBtn.onclick = () => openModal();
modalCloseBtn.onclick = () => closeModal();
window.addEventListener("click", outSideClick);

function openModal() {
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

function outSideClick(e) {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}


