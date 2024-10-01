const btnAdd = document.querySelector('.btnAdd');
const btnClose = document.querySelector('.btnClose');
const modal = document.querySelector('#modal');

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

function createBookElement(book, idx) {
  const card = document.createElement('div');
  card.classList.add('add');

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

  // Add Buttons function

  return card;
}
