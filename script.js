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

function toggleRead(id){
    const book = myLibrary[id]
    book.read = !book.read;
    refreshBooks()
}

myLibrary.push(new Book('Hobbit', 'J.R.R. Tolkien', 339, true));
myLibrary.push(new Book('The Witcher', 'Andrzej Sapkowski', 340, false));

const refreshBooks = () => {
    while (books.firstChild) {
        books.removeChild(books.firstChild);
    }
    myLibrary.forEach((book, index) => {
        console.log(book);
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
    })
}

refreshBooks();

let removeBook = (id) => {
    console.log(id)
    delete myLibrary[id];
    refreshBooks()
}
