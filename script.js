const books = document.querySelector('.books')
const showDialogBtn = document.querySelector('#show-dialog-btn')
const closeDialogBtn = document.querySelector('#close-dialog-btn')
const dialog = document.querySelector('dialog')
const form = document.querySelector('form')

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');

const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

myLibrary.push(new Book('Hobbit', 'J.R.R. Tolkien', 339, true));
myLibrary.push(new Book('The Witcher', 'Andrzej Sapkowski', 340, false));

showDialogBtn.addEventListener('click', () => {
    dialog.showModal();
})

closeDialogBtn.addEventListener('click', (e) => {
    clearInput();
    dialog.close()
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.checkValidity()) {
        const book = new Book(
            titleInput.value,
            authorInput.value,
            pagesInput.value,
            readInput.checked)
        myLibrary.push(book);
        dialog.close()
        clearInput()
        refreshBooks()
    }
});

const refreshBooks = () => {
    while (books.firstChild) {
        books.removeChild(books.firstChild);
    }
    myLibrary.forEach((book, index) => {
        createBookDiv(book, index);
    })
}

function createBookDiv(book, index) {
    book.id = index;
    const div = document.createElement('div')
    div.classList.add('book');
    const title = document.createElement('h2');
    title.textContent = book.title;
    const author = document.createElement('p');
    author.textContent = book.author;
    const pages = document.createElement('p');
    pages.textContent = book.pages;
    const read = document.createElement('h3');
    if (book.read) {
        read.textContent = 'Read';
        read.classList.add('read');
    } else {
        read.textContent = 'Not read'
        read.classList.add('not-read')
    }
    const removeBtn = document.createElement('button')
    removeBtn.classList.add('remove-btn')
    removeBtn.textContent = 'Remove';
    removeBtn.setAttribute('book-id', String(book.id));
    removeBtn.addEventListener('click', () => {
        removeBook(removeBtn.getAttribute('book-id'))
    })
    const readBtn = document.createElement('button')
    readBtn.classList.add('remove-btn')
    readBtn.textContent = 'Toggle read'
    readBtn.setAttribute('book-id', String(book.id))
    readBtn.addEventListener('click', () => {
        toggleRead(readBtn.getAttribute('book-id'))
    })
    const btnContainer = document.createElement('div')
    btnContainer.classList.add('btn-container')
    div.appendChild(title);
    div.appendChild(author);
    div.appendChild(pages);
    div.appendChild(read)
    btnContainer.appendChild(removeBtn)
    btnContainer.appendChild(readBtn)
    div.appendChild(btnContainer)
    books.appendChild(div);
}

function toggleRead(id) {
    const book = myLibrary[id]
    book.read = !book.read;
    refreshBooks()
}

let removeBook = (id) => {
    console.log(id)
    delete myLibrary[id];
    refreshBooks()
}

function clearInput() {
    titleInput.value = ''
    authorInput.value = ''
    pagesInput.value = ''
    readInput.checked = false
}

refreshBooks();