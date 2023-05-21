let addBook;

/* Book list init */
(() => {
  let bookList = [];

  function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.delete = {};
    this.index = (bookList.length); /* Index given before book is added to bookList */
  }

  Book.prototype.toggleReadMethod = function toggleReadMethod() { this.read = !this.read; };

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

  addBook = (title, author, pages, read) => {
    const book = new Book(title, author, pages, read);
    bookList.push(book);
    createBookDOM(book, book.index);
  };

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
})();

/* Form init */
(() => {
  const inputFields = document.querySelectorAll('input');
  const showModal = document.querySelector('.show-form');
  const closeModalButton = document.querySelector('.close-modal');

  showModal.addEventListener('click', () => {
    const modal = document.querySelector('.modal-form');
    modal.classList.add('active');
  });

  function resetForm() {
    document.querySelector('form').reset();
    inputFields.forEach((inputField) => {
      inputField.parentElement.classList.remove('invalid');
      inputField.parentElement.querySelector('label').classList.remove('active');
    });
  }

  function closeModal() {
    const modal = document.querySelector('.modal-form');
    modal.classList.remove('active');
    setTimeout(() => resetForm(), getComputedStyle(document.querySelector(':root')).getPropertyValue('--transition-time-standard').replace(/\D/g, ''));
  }

  closeModalButton.addEventListener('click', () => {
    closeModal();
  });

  inputFields.forEach((inputField) => {
    inputField.addEventListener('focusin', (e) => {
      e.target.parentElement.classList.add('focus');
      e.target.parentElement.querySelector('label').classList.add('active');
    });
    inputField.addEventListener('focusout', (e) => {
      e.target.parentElement.classList.remove('focus');
      if (e.target.value === '') {
        e.target.parentElement.querySelector('label').classList.remove('active');
      }
    });
    inputField.addEventListener('input', (e) => {
      if (e.target.validity.valid) {
        if (e.target.type === 'radio') {
          const radioDivs = e.target.parentElement.parentElement.querySelectorAll('div');
          radioDivs.forEach((radioDiv) => { radioDiv.classList.remove('invalid'); });
        } else {
          e.target.parentElement.classList.remove('invalid');
        }
      }
    });
  });

  function checkFormValidity() {
    let output = true;
    inputFields.forEach((inputField) => {
      if (!inputField.validity.valid) {
        inputField.parentElement.classList.add('invalid');
        output = false;
      }
    });
    return output;
  }

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    if (checkFormValidity()) {
      addBook(data.get('title'), data.get('author'), data.get('pages'), !!data.get('read'));
      closeModal();
    }
  });
})();

(() => {
  const year = new Date();
  document.querySelector('.year').textContent += year.getFullYear();
})();

addBook('The Hobbit', 'J.R.R. Tolkien', '317', true);
