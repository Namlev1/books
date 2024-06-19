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

const main = document.querySelector('.main')

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
    main.appendChild(div);
})