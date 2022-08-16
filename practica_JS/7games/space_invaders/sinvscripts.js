// SPACE INVADERS SCRIPTS
// Bring the HTML elements
const grid = document.querySelector('.grid')
const fragment = document.createDocumentFragment()
const displayResult = document.querySelectorAll('.result')
const startGame = document.querySelector('.start_game')
const modal = document.querySelector('.modal')

let currentShooterIndex = 202
const gridWidth = 15
let direction = 1
let alienIntervalId // to reset the timer
let goingRight = true // allow us to know if the aliens are moving right
let aliensRemoved = []
let result = 0

// Start GAME
startGame.addEventListener('click', () => {
  modal.classList.add('close')
  alienIntervalId = setInterval(moveInvaders, 500);
})



// Create the squares or space ships

for(let i = 0; i < 225; i++) {
  const ships = document.createElement('div')
  fragment.appendChild(ships)
  grid.appendChild(fragment)
}

// Select all the squares in the grid
const squares = Array.from(document.querySelectorAll('.grid div'))

// For the invaders, is useful to use an array, is gonna be three rows from 0-9 + 6 and so
const alienInvaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]


// Let´s draw the alien invaders
function drawAlien() {
  for(let i = 0; i < alienInvaders.length; i++) {
    // an if to check if the aliensRemoved does not include the index we are passing, so it draws an invader
    if(!aliensRemoved.includes(i)) {

      squares[alienInvaders[i]].classList.add('invaders')
    }
  }
}
drawAlien()

function removeAlien() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove("invaders");
  }
}


squares[currentShooterIndex].classList.add('shooter')
// Shooter movement
function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter')
  switch(e.key) {
    case 'ArrowLeft':
      if(currentShooterIndex % gridWidth !== 0) {
        currentShooterIndex -= 1
      }
      break;
    case 'ArrowRight':
      if(currentShooterIndex % gridWidth < gridWidth - 1) {
        currentShooterIndex += 1
      }
      break;
  }
  squares[currentShooterIndex].classList.add('shooter')
}

document.addEventListener('keydown', moveShooter)

// Move INVADERS
function moveInvaders() {
  // tell the invaders they arrive the left edge
  const leftEdge = alienInvaders[0] % gridWidth === 0
  // tell the invaders they arrive the right edge
  const rightEdge = alienInvaders[alienInvaders.length - 1] % gridWidth === gridWidth - 1
  
  removeAlien()

  // Check aliens moving to the right
  if(rightEdge && goingRight) {
    for(let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += gridWidth + 1 // if they reach the right they move down and change the direction
      direction = -1
      goingRight = false
    }
  } 

  // check aliens moving to the left
  if(leftEdge && !goingRight) {
    for(let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += gridWidth - 1
      direction = 1
      goingRight = true
    }
  }

  for(let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction
  }

  drawAlien()

  // End game when invaders reach shooter
  if(squares[currentShooterIndex].classList.contains('invaders', 'shooter')) {
    modal.classList.remove('close')
    displayResult[0].classList.add('show')
    displayResult[0].textContent = 'You LOSE!!'
    clearInterval(alienIntervalId)
    drawGameBoard()
  }

  // End game when invaders reach the bottom
  for(let i = 0; i < alienInvaders.length; i++) {
    if(alienInvaders[i] > squares.length) {
      displayResult[0].textContent = 'You LOSE!!';
      clearInterval(alienIntervalId);
    }
  }

  // check for win
  if(aliensRemoved.length === alienInvaders.length) {
    modal.classList.remove("close");
    displayResult[0].classList.add("show");
    displayResult[0].textContent = 'You WIN!!';
    // result++
    displayResult[1].textContent = result
    clearInterval(alienIntervalId);
  }
}

// alienIntervalId = setInterval(moveInvaders, 500)

// shooter function
function shoot(e) {
  let laserId
  let currentLaserIndex = currentShooterIndex // the shoots start from the shooter index
  function moveShoot() {
    squares[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= gridWidth
    squares[currentLaserIndex].classList.add('laser')
    
    // laser collision
    if(squares[currentLaserIndex].classList.contains('invaders')) {
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('invaders')
      squares[currentLaserIndex].classList.add('boom')
      result += 1
      displayResult[1].textContent = result
      // laser desapear when reach the invaders
      setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)
      clearInterval(laserId)

      // removing the invader from the array
      const invaderRemoval = alienInvaders.indexOf(currentLaserIndex)
      aliensRemoved.push(invaderRemoval)
    }
  }
  // laser movement
  switch(e.key) {
    case 'ArrowUp': 
      laserId = setInterval(moveShoot, 100)
  }

}

document.addEventListener('keydown', shoot)

// // Start GAME
// startGame.addEventListener('click', () => {
//   modal.classList.add('close')
//   alienIntervalId = setInterval(moveInvaders, 500);
// })
