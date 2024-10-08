const btnAdd = document.querySelector('.btnAdd');
const btnClose = document.querySelector('.btnClose');
const modal = document.querySelector('#modal');
const form = document.querySelector('form');
const mainContent = document.querySelector('.mainContent');

btnAdd.addEventListener('click', () => {
  modal.showModal();
});

document.addEventListener('click', (e) => {
  if (
    e.target === btnClose ||
    (e.target === modal &&
      !modal.querySelector('.modalContent').contains(e.target))
  ) {
    modal.close();
  }
});

const library = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

// function Book(title, author, pages, read) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
// }

// Book.prototype.toggleRead = function () {
//   this.read = !this.read;
// };

function createBookElement(book, idx) {
  const card = document.createElement('div');
  card.classList.add('card');

  const elements = [
    {
      tag: 'h2',
      text: `${book.title}`,
    },
    {
      tag: 'p',
      text: `${book.author}`,
    },
    {
      tag: 'p',
      text: `${book.pages}`,
    },
  ];

  elements.forEach(({ tag, text }) => {
    const element = document.createElement(tag);
    element.textContent = text;
    card.appendChild(element);
  });

  const readButton = createButton(
    book.read ? 'Unread' : 'Read',
    [book.read ? 'readStatus' : 'unreadStatus'],
    () => handleRead(book, readButton)
  );

  const removeButton = createButton('Remove', ['btnRemove'], () =>
    handleRemove(idx, card)
  );

  card.appendChild(readButton);
  card.appendChild(removeButton);

  return card;
}

function handleRead(book, button) {
  book.toggleRead();
  button.textContent = book.read ? 'Unread' : 'Read';
  button.classList.toggle('readStatus');
  button.classList.toggle('unreadStatus');
}

function handleRemove(idx, card) {
  library.splice(idx, 1);
  mainContent.removeChild(card);
}

function renderBooks() {
  mainContent.innerHTML = '';
  library.forEach((book, idx) => {
    mainContent.appendChild(createBookElement(book, idx));
  });
}

function createButton(text, classNames, onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.classList.add(...classNames);

  button.addEventListener('click', onClick);

  return button;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  //   const formData = new FormData(form);
  //   const title = formData.get('title');
  //   const author = formData.get('author');
  //   const pages = parseInt(formData.get('pages'));
  //   const read = formData.get('read') === 'on';

  const { title, author, pages, read } = Object.fromEntries(new FormData(form));

  if (!title || !author || !pages) {
    alert('Please fill all fields');
    return;
  }

  library.push(new Book(title, author, pages, read));
  modal.close();
  form.reset();
  renderBooks();
});
