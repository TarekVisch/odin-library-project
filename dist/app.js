let library = [];

const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get Input Values
  let title = e.target.elements.title.value;
  let author = e.target.elements.author.value;
  let pages = e.target.elements.pages.value;

  // Check if Input value are empty strings
  if (
    title != '' &&
    author != '' &&
    pages != '' &&
    !Number.isNaN(parseInt(pages))
  ) {
    let id = 0;
    let read = e.target.elements.read.checked;

    if (library.length > 0) {
      let lastBookId = library[library.length - 1].id;
      id = lastBookId + 1;
    }

    addBookToLibrary(new Book(id, title, author, parseInt(pages), read, false));

    display();
  } else {
    alert('Empty fields');
  }

  form.reset();
});

class Book {
  constructor(id, title, author, pages, read, displayed) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.displayed = displayed;
  }
}

function addBookToLibrary(book) {
  library.push(book);
}

function createHTMLElementWithClassName(element, className) {
  let placeHolder = document.createElement(element);
  placeHolder.classList.add(className);

  return placeHolder;
}

const booksRow = document.querySelector('.books__row');
function bookHTMLMarkup(book) {
  let bookCol = createHTMLElementWithClassName('div', 'books__col');
  bookCol.dataset.id = book.id;

  let bookCard = createHTMLElementWithClassName('div', 'books__book');

  // Book Cover
  let bookCover = createHTMLElementWithClassName('div', 'books__book--cover');
  bookCover.style.backgroundImage = `url(https://picsum.photos/seed/${randomNumber(
    1000
  )}/500/500?grayscale)`;
  bookCover.style.backgroundRepeat = 'no-repeat';
  bookCover.style.backgroundSize = 'cover';
  bookCover.style.backgroundPosition = 'center';

  // Book Info
  let bookInfo = createHTMLElementWithClassName('div', 'books__book--detail');

  let title = createHTMLElementWithClassName('p', 'book__title');
  title.textContent = book.title;

  let author = createHTMLElementWithClassName('p', 'book__author');
  author.textContent = `By ${book.author}`;

  let pages = createHTMLElementWithClassName('p', 'book__pages');
  pages.textContent = `Page Count: ${book.pages}`;

  // Book Buttons (the delete button and change read status button)
  let bookButtons = createHTMLElementWithClassName(
    'div',
    'books__book--buttons'
  );

  let readStatus = createHTMLElementWithClassName(
    'button',
    'books__book--buttons-read'
  );
  readStatus.addEventListener('click', () => {
    changeReadStatus(book.id);
  });
  if (book.read) {
    readStatus.classList.add('active');
    readStatus.textContent = "I've read this";
  } else {
    readStatus.textContent = "Didn't read this";
  }

  let deleteButton = createHTMLElementWithClassName(
    'button',
    'books__book--buttons-delete'
  );
  deleteButton.addEventListener('click', () => {
    deleteBook(book.id);
  });
  deleteButton.textContent = 'Delete';

  bookButtons.appendChild(readStatus);
  bookButtons.appendChild(deleteButton);
  bookInfo.appendChild(title);
  bookInfo.appendChild(author);
  bookInfo.appendChild(pages);
  bookCard.appendChild(bookCover);
  bookCard.appendChild(bookInfo);
  bookCard.appendChild(bookButtons);
  bookCol.appendChild(bookCard);
  booksRow.appendChild(bookCol);
}

function deleteBook(bookId) {
  let book = document.querySelector(`[data-id="${bookId}"]`);
  let bookIndex = library.findIndex((book) => book.id === bookId);
  library.splice(bookIndex, 1);
  booksRow.removeChild(book);
}

function changeReadStatus(bookId) {
  const bookButton = document.querySelector(
    `[data-id="${bookId}"] .books__book--buttons-read`
  );
  bookButton.classList.toggle('active');
  if (bookButton.textContent === "I've read this") {
    bookButton.textContent = "Didn't read this";
  } else if (bookButton.textContent === "Didn't read this") {
    bookButton.textContent = "I've read this";
  }

  const bookIndex = library.findIndex((book) => book.id === bookId);
  library[bookIndex].read = !library[bookIndex].read;
}

function display() {
  for (let book of library) {
    if (!book.displayed) {
      book.displayed = true;
      bookHTMLMarkup(book);
    }
  }
}

function randomNumber(num) {
  return Math.floor(Math.random() * num + 1);
}

display();
