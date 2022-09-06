// NAVBAR SCRIPTS
/* INDEX
  ACCORDION */

// ACCORDION NAVBAR
const navBtn = document.querySelectorAll('.accordion-bar');
const panels = document.querySelectorAll('.panel')
console.log(navBtn)

navBtn.forEach(button => {
  button.addEventListener('click', (e) => {
    e.target.nextElementSibling.classList.toggle('show')
    e.target.classList.toggle('act')
  })
})