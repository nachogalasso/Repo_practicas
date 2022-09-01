/* Calling elements from HTML */
const iconMenu = document.getElementById("toggle-menu");
const mainMenu = document.getElementById("navbar");
const mainLogo = document.getElementById("logo");
const modal = document.getElementById("myModal");
const openModal = document.getElementById("modal-btn");
const closeModal = document.getElementsByClassName("close-btn")[0];

/* Calling the events */
iconMenu.addEventListener("click", () => {
  mainMenu.classList.toggle("show");
  iconMenu.classList.toggle("toggle-responsive");
  mainLogo.classList.toggle("logo");
});

openModal.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});
