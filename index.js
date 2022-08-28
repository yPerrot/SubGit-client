const modal = document.querySelector("#modal");
const closeModalBtn = document.querySelector("#close-modal-btn");
const form = document.querySelector('#form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  e.stopPropagation();

  const link = form.elements['link'].value;

  modal.showModal();
})

closeModalBtn.addEventListener('click',() => modal.close())
