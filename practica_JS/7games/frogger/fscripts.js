// FROGGER SCRIPTS
// Brining HTML elements
const timeLeft = document.querySelector('#time_left');
const displayResult = document.querySelector('#result');
const startPauseBtn = document.querySelector('#sp_btn');
const squares = document.querySelectorAll('.grid div');

let currentIndex = 2 // if I change the number is gonna turn green the div with that index
// Move FROG
function moveFrog(e) {
  // take al the div array and use it for the frog
  switch(e.key) {
    case 'ArrowLeft':
      console.log('move left')
      break
  }
  squares[currentIndex].classList.add('frog')
}
document.addEventListener('keyup', moveFrog)