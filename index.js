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
    console.log("added book");
    let book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    console.log("added book next");


}

// addBookToLibrary("Clean Code", "Mainul", "299", true);


function displayBook() {
    let container = document.getElementById("container")

    myLibrary.map(book => {
        let bookContainer = document.createElement("div");
        bookContainer.classList.add("book-card");
        bookContainer.innerHTML = `<h1 class="title">${book.title}</h1>
                                <h3 class="author">${book.author}</h3>
                                <h5 class="pages">${book.pages}</h5>
                                <p className="info">${book.info()}</p>
                                <button id="toggle-read">${book.isRead ? "Read" : "Not Read"}</button>
                                <button id="remove-book">Remove</button`
        container.appendChild(bookContainer);
    })
}


//
let modal = document.getElementById("bookFormModal");
let addBookBtn = document.getElementById("addBook");
let modalCloseBtn = document.getElementById("closeBtn")
let modalForm = document.getElementById("modal-form");
let toggleRead = document.getElementById("toggle-read");
let removeBook = document.getElementById("remove-book");


addBookBtn.onclick = () => openModal();
modalCloseBtn.onclick = () => closeModal();
window.addEventListener("click", outSideClick);
modalForm.addEventListener("submit", handleAddBook);
toggleRead.addEventListener("click", () => {
    
})


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

function handleAddBook(e) {
    e.preventDefault();

    let title = e.target.title.value;
    let author = e.target.author.value;
    let pages = e.target.pages.value;
    let read = e.target.read.checked;


    addBookToLibrary(title, author, pages, read);
    console.log(myLibrary);

    // title = "";
    // author = "";
    // pages = "";
    // read = "";
    displayBook();

    closeModal();

}

displayBook();



