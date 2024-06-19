const main = document.querySelector('.main')
const books = document.querySelector('.books')
const showDialogBtn = document.querySelector('#show-dialog-btn')
const closeDialogBtn = document.querySelector('#close-dialog-btn')
const confirmDialBtn = document.querySelector('#confirm-btn')
const dialog = document.querySelector('dialog')

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.querySelector('#read');

showDialogBtn.addEventListener('click', () => {
    dialog.showModal();
})

closeDialogBtn.addEventListener('click', () => {
    dialog.close();
})

confirmDialBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const bookData = new Book(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        readInput.checked)
    dialog.close(JSON.stringify(bookData))
})

dialog.addEventListener("close", (e) => {
    const bookData = JSON.parse(dialog.returnValue);
    myLibrary.push(bookData);
    console.log(`Form return value: ${JSON.stringify(bookData, null, 2)}`)
    refreshBooks()
});

const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

myLibrary.push(new Book('Hobbit', 'J.R.R. Tolkien', 339, true));
myLibrary.push(new Book('The Witcher', 'Andrzej Sapkowski', 340, false));

const refreshBooks = () => {
    while (books.firstChild) {
        books.removeChild(books.firstChild);
    }
    myLibrary.forEach((book) => {
        console.log(book);
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
        div.appendChild(title);
        div.appendChild(author);
        div.appendChild(pages);
        div.appendChild(read)
        books.appendChild(div);
    })
}

refreshBooks();