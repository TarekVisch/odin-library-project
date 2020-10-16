let library = [];

const form = document.querySelector('.form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  let title = e.target.elements.title.value;
  let author = e.target.elements.author.value;
  let pages = e.target.elements.pages.value;

  if (
    title != '' &&
    author != '' &&
    pages != '' &&
    !Number.isNaN(parseInt(pages))
  ) {
    let read = e.target.elements.read.checked;

    addBookToLibrary(new Book(title, author, parseInt(pages), read, false));

    display();
  } else {
    alert('Empty fields');
  }
});

function Book(title, author, pages, read, displayed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.displayed = displayed;
}

function addBookToLibrary(book) {
  library.push(book);
}

function createElementWithClassName(element, className) {
  let placeHolder = document.createElement(element);
  placeHolder.classList.add(className);

  return placeHolder;
}

function bookHTMLMarkup(book) {
  const booksRow = document.querySelector('.books__row');

  let bookCol = createElementWithClassName('div', 'books__col');
  let bookCard = createElementWithClassName('div', 'books__book');

  // Book Cover
  let bookCover = createElementWithClassName('div', 'books__book--cover');

  // Book Info
  let bookInfo = createElementWithClassName('div', 'books__book--detail');

  let title = createElementWithClassName('p', 'book__title');
  title.textContent = book.title;

  let author = createElementWithClassName('p', 'book__author');
  author.textContent = `By ${book.author}`;

  let pages = createElementWithClassName('p', 'book__pages');
  pages.textContent = `Page Count: ${book.pages}`;

  // Book Buttons (the delete button and change read status button)
  let bookButtons = createElementWithClassName('div', 'books__book--buttons');

  let readStatus = createElementWithClassName(
    'button',
    'books__book--buttons-read'
  );
  if (book.read) {
    readStatus.classList.add('active');
    readStatus.textContent = "I've read this";
  } else {
    readStatus.textContent = "Didn't read this";
  }

  let deleteButton = createElementWithClassName(
    'button',
    'books__book--buttons-delete'
  );
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

function display() {
  for (let item of library) {
    if (!item.displayed) {
      item.displayed = true;
      bookHTMLMarkup(item);
    }
  }
}

display();
