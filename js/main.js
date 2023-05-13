let bookList = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function createBookElement(key, value) {
  const element = document.createElement('div');
  element.classList.add(key);
  element.appendChild(document.createTextNode(value));
  return element;
}

function createBookDOM(book, dataIndex) {
  let bookDOM = document.createElement('div');
  Object.keys(book).forEach((key) => {
    if (typeof book[key] !== 'boolean') {
      bookDOM.appendChild(createBookElement(key, book[key]));
    }
  });
  bookDOM.dataset.index = dataIndex;
  bookDOM.classList.add(`read-${book.read}`);
  let parent = document.querySelector('.book-list');
  parent.appendChild(bookDOM);
}

function addBook(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  bookList.push(book);
  const dataIndex = bookList.length - 1; /* Might be better to simply have a counter somewhere */
  createBookDOM(book, dataIndex);
}

/* For testing - remove when done */
addBook('Book 1', 'By Me', 287, true);
addBook('Book 2', 'Not by me', 123, false);

/* Interactions */
Book.prototype.toggleRead = function toggleRead() { this.read = !this.read; };
