let bookList = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.delete = {};
  this.index = (bookList.length); /* Index given before book is added to bookList */
}

Book.prototype.toggleReadMethod = function toggleRead() { this.read = !this.read; };

function createBookElement(key, value) {
  const element = document.createElement('div');
  element.classList.add(key);
  element.appendChild(document.createTextNode(value));
  return element;
}

function createBookDOM(book, dataIndex) {
  let bookDOM = document.createElement('div');
  Object.keys(book).forEach((key) => {
    if (typeof book[key] === 'string') {
      bookDOM.appendChild(createBookElement(key, book[key]));
    } else {
      bookDOM.appendChild(createBookElement(key, ''));
    }
  });
  bookDOM.dataset.index = dataIndex;
  bookDOM.classList.add(`read-${book.read}`);
  const parent = document.querySelector('.book-list');
  parent.appendChild(bookDOM);
}

function addBook(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  bookList.push(book);
  createBookDOM(book, book.index);
}

function updateIndexes() {
  bookList.forEach((book) => {
    const previousIndex = book.index;
    // eslint-disable-next-line no-param-reassign
    book.index = bookList.indexOf(book);
    const bookDOM = document.querySelector(`[data-index='${previousIndex}']`);
    bookDOM.dataset.index = book.index;
  });
}

function toggleRead(e) {
  const parentIndex = e.target.parentNode.dataset.index;
  bookList[parentIndex].toggleReadMethod();
  e.target.parentNode.classList.remove(`read-${!bookList[parentIndex].read}`);
  e.target.parentNode.classList.add(`read-${bookList[parentIndex].read}`);
}

function deleteElement(e) {
  const parentIndex = e.target.parentNode.dataset.index;
  bookList.splice(parentIndex, 1);
  e.target.parentNode.remove();
  updateIndexes();
}

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('read')) {
    toggleRead(e);
  }
  if (e.target.classList.contains('delete')) {
    deleteElement(e);
  }
});

/* For testing - remove when done */
addBook('Book 1', 'By Me', '287', true);
addBook('Book 2', 'Not by me', '123', false);
