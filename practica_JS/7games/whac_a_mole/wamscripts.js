// Calling the HMTL Elements
const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const resultDisplay = document.getElementById('score');
const startGame = document.querySelector('.start');

startGame.addEventListener("click", moveMole);

// For starting the count
let result = 0;
let hitMole
let timerId = null
let currentTime = 10
let countDownTimerId = null

// Random mole in the squares
function randomMole() {
  squares.forEach(square => {
    square.classList.remove('mole')
  })

  // generate a random position
  let randomPosition = squares[Math.floor(Math.random() * 9)] // recordar que como está dentro del array toma el "length"
  randomPosition.classList.add('mole')

  hitMole = randomPosition.id
}


// HIT COUNTER
squares.forEach(mole => {
  mole.addEventListener('mousedown', () => {
    if(mole.id == hitMole) {
      result++
      resultDisplay.textContent = result
      hitMole = null
    }
  })
})

// make the mole to appear in random squares
function moveMole() {
  timerId = setInterval(randomMole, 800)
  countDownTimerId = setInterval(countDown, 1000)
}


// GAME FINISH
function countDown() {
  currentTime--
  countDownTimerId--
  timeLeft.textContent = currentTime
  
  console.log(countDownTimerId)
  console.log(timerId)
  // what happens when the time finishes
  if(currentTime == 0) {
    clearInterval(countDownTimerId)
    clearInterval(timerId)
    alert('Game Over')
  }
}
