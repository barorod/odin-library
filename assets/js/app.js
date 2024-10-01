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
