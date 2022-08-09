// SPACE INVADERS SCRIPTS
// Bring the HTML elements
const grid = document.querySelector('.grid')
const fragment = document.createDocumentFragment()

let currentShooterIndex = 202
const gridWidth = 15
let direction = 1
let alienIntervalId // to reset the timer
let goingRight = true // allow us to know if the aliens are moving right

// Create the squares or space ships
for(let i = 0; i < 225; i++) {
  const ships = document.createElement('div')
  fragment.appendChild(ships)
  grid.appendChild(fragment)
}

// Select all the squares in the grid
const squares = Array.from(document.querySelectorAll('.grid div'))
console.log(squares)

// For the invaders, is useful to use an array, is gonna be three rows from 0-9 + 6 and so
const alienInvaders = [
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
]

// Let´s draw the alien invaders
function drawAlien() {
  for(let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.add('invaders')
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

}

// alienIntervalId = setInterval(moveInvaders, 500)