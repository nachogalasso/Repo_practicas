const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('.display');
// bring the width and height from the ccs stylesheet
const blockWidth = 7
const blockHeight = 2
const boardWidth = 41
const boardHeight = 22
const ballDiameter = 2
let xDirection = 2
let yDirection = 2
let timerId
let score = 0

// User start position
const userStart = [17, 1] // an array with the coord where user is gona start the game
// we need track the user movement
let currentUserPosition = userStart

// Ball start position
const ballStart = [19.5, 4]
let ballCurrentPosition = ballStart

// The purpose of using a 'class' in JS, is to create a template, it´s gonna have properties that they will be called so...
// xAxis and yAxis are the value we pass in the constructor.
class Block {
  constructor(xAxis, yAxis) {
    // DON´T FORGET THE 'THIS' BEFORE THE PROPERTY
    this.bottomLeft = [xAxis, yAxis]
    this.bottomRight = [xAxis + blockWidth, yAxis]
    this.topLeft = [xAxis, yAxis + blockHeight]
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight] 
  }
}

// An object with all the blocks
const blocks = [
  // first row
  new Block(1, 19.5),
  new Block(9, 19.5),
  new Block(17, 19.5),
  new Block(25, 19.5),
  new Block(33, 19.5),
  // second row
  new Block(1, 16.5),
  new Block(9, 16.5),
  new Block(17, 16.5),
  new Block(25, 16.5),
  new Block(33, 16.5),
  // third row
  new Block(1, 13.5),
  new Block(9, 13.5),
  new Block(17, 13.5),
  new Block(25, 13.5),
  new Block(33, 13.5),
  
]

// CREATING the BLOCKS
function drawBlocks() {
  for( let i = 0; i < blocks.length; i++) {

    const block = document.createElement('div');
    block.classList.add('block') // remember when adding a class is not necessaty to use the .
    // move the blocks
    block.style.left = blocks[i].bottomLeft[0] + 'rem'
    block.style.bottom = blocks[i].bottomLeft[1] + 'rem'
    // add the block
    grid.appendChild(block)

  }
}
drawBlocks()


// USER
const user = document.createElement('div')
user.classList.add('user')
userDraw()
grid.appendChild(user)

// draw userMove
function userDraw() {
  user.style.left = currentUserPosition[0] + 'rem' //'17rem'
  user.style.bottom = currentUserPosition[1] + 'rem' //'2rem'
}

// dram ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'rem'
  ball.style.bottom = ballCurrentPosition[1] + 'rem'
}

// user move
function userMove(e) {
  switch(e.key) {
    case 'ArrowLeft':
      // to avoid user going out of the game box, we need to add an if condition
      if(currentUserPosition[0] > 0) {
        currentUserPosition[0] -= 1
        userDraw()
      }
      break;
    case 'ArrowRight':
      if(currentUserPosition[0] < boardWidth - blockWidth)
        currentUserPosition[0] += 1
        userDraw()
      
      break;
  }
}

document.addEventListener('keydown', userMove)

// GAME BALL
const ball = document.createElement('div')
ball.classList.add('ball')
// ball.style.left = ballCurrentPosition[0] + 'rem'
// ball.style.bottom = ballCurrentPosition[1] + 'rem'
drawBall()
grid.appendChild(ball)

// Move BALL
function moveBall() {
  ballCurrentPosition[0] += xDirection
  ballCurrentPosition[1] += yDirection
  drawBall()
  checkCollisions()
}

timerId = setInterval(moveBall, 300)

// CHECK COLLISIONS
function checkCollisions() {
  // check block collisions
  for(let i=0; i < blocks.length; i++) {
    if(
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1]) {
        // the best is to grab all the blocks
        const allBlocks = Array.from(document.querySelectorAll('.block'))
        // console.log(allBlocks)
        allBlocks[i].classList.remove('block')
        blocks.splice(i, 1) // remove only the block the ball touch, and then we change direction
        changeDirection()
        score++
        resultDisplay.innerHTML = score

        // check for win
        if(blocks.length === 0) {
          resultDisplay.innerHTML = 'You WIN!!'
          clearInterval(timerId)
          document.removeEventListener('keydown', userMove)
        }
      }
  }

  // Check for ball collisions
  if(ballCurrentPosition[0] >= (boardWidth - ballDiameter) ||
    ballCurrentPosition[1] >= (boardHeight - ballDiameter) ||
    ballCurrentPosition[0] <= 0) {
    changeDirection()
  }

  // Check for user collisions
  if(
    (ballCurrentPosition[0] > currentUserPosition[0] && ballCurrentPosition[0] < currentUserPosition[0] + blockWidth) &&
    (ballCurrentPosition[1] > currentUserPosition[1] && ballCurrentPosition[1] < currentUserPosition[1] + blockHeight)
    ) {
      changeDirection()
    }

  // check end of game
  if(ballCurrentPosition[1] <= 0) {
    clearInterval(timerId)
    resultDisplay.innerHTML = "You LOSE!!!"
    document.removeEventListener('keydown', userMove)
  }
}

function changeDirection() {
  if(xDirection === 2 && yDirection === 2) {
    yDirection = -2
    return
  }
  if(xDirection === 2 && yDirection === -2) {
    xDirection = -2
    return
  }
  
  if(xDirection === -2 && yDirection === -2) {
    yDirection = 2
    return
  }
  if(xDirection === -2 && yDirection === 2) {
    xDirection = 2
    return
  }
  
  
}