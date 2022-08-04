// FROGGER SCRIPTS
// Bringing HTML elements
const timeDown = document.querySelector('#time_left'); // timer
const displayResult = document.querySelector('#result'); // span for the game result
const startPauseBtn = document.querySelector('#sp_btn'); // btn to start or pause the game
const squares = document.querySelectorAll('.grid div'); // each div from the grid board
const logsLeft = document.querySelectorAll('.log-left'); // bring all div with class log-left
const logsRight = document.querySelectorAll('.log-right') // bring all div with class log-right
const carsLeft = document.querySelectorAll('.car-left'); // bring all div with class car-left
const carsRight = document.querySelectorAll('.car-right'); // bring all div with class car-right

let currentIndex = 76 // if I change the number is gonna turn green the div with that index. We move left and right
const gridWidth = 9 // we use the grid width and height to move up or down
let timerId // stops all the logs and car movement
let currentTime = 20// game timer
let outcomeTimerId // check for the function win or luse. Also timerId and outcomeTimerId both have value = null

// Move FROG
function moveFrog(e) {
  // console.log(e) // Remember I can console the 'e' event
  squares[currentIndex].classList.remove('frog')
  // take al the div array and use it for the frog.
  switch (e.key) {
    case "ArrowLeft":
      if(currentIndex % gridWidth !== 0) {
        currentIndex = currentIndex - 1
      }
      break;
    case "ArrowRight":
      if(currentIndex % gridWidth < gridWidth - 1) {
        currentIndex += 1
      }
      break;
    case "ArrowUp":
      if(currentIndex - gridWidth >= 0) {
        currentIndex -= gridWidth
      }
      break;
    case "ArrowDown":
      if(currentIndex + gridWidth < gridWidth * gridWidth) {
        currentIndex += gridWidth
      }
      break;
  }
  squares[currentIndex].classList.add("frog");
}


// MOVE ALL ELEMENTS
// picking all the logs and then pass them throught an other function to analice wich they have
function moveElements() {
  currentTime--
  timeDown.textContent = currentTime
  logsLeft.forEach(logLeft => moveLogLeft(logLeft))
  logsRight.forEach(logRight => moveLogRight(logRight))
  carsLeft.forEach(carLeft => moveCarLeft(carLeft))
  carsRight.forEach(carRight => moveCarRight(carRight))
  
}

function checkOutcomeTimer() {
  loseGame();
  winGame();
}

// LOG MOVE LEFT
// check what kind of class the div have
function moveLogLeft(logLeft) {
  switch(true) {
    case logLeft.classList.contains('l1'):
      logLeft.classList.remove('l1')
      logLeft.classList.add('l2')
      break
    case logLeft.classList.contains('l2'):
      logLeft.classList.remove('l2')
      logLeft.classList.add('l3')
      break
    case logLeft.classList.contains('l3'):
      logLeft.classList.remove('l3')
      logLeft.classList.add('l4')
      break
    case logLeft.classList.contains('l4'):
      logLeft.classList.remove('l4')
      logLeft.classList.add('l5')
      break
    case logLeft.classList.contains('l5'):
      logLeft.classList.remove('l5')
      logLeft.classList.add('l1')
      break
  }
}

// MOVE LOG RIGHT
function moveLogRight(logRight) {
  switch (true) {
    case logRight.classList.contains("l5"):
      logRight.classList.remove("l5");
      logRight.classList.add("l4");
      break;
    case logRight.classList.contains("l4"):
      logRight.classList.remove("l4");
      logRight.classList.add("l3");
      break;
    case logRight.classList.contains("l3"):
      logRight.classList.remove("l3");
      logRight.classList.add("l2");
      break;
    case logRight.classList.contains("l2"):
      logRight.classList.remove("l2");
      logRight.classList.add("l1");
      break;
    case logRight.classList.contains("l1"):
      logRight.classList.remove("l1");
      logRight.classList.add("l5");
      break;
  }
}

// MOVE CAR LEFT
function moveCarLeft(carLeft) {
  switch (true) {
    case carLeft.classList.contains("c1"):
      carLeft.classList.remove("c1");
      carLeft.classList.add("c2");
      break;
    case carLeft.classList.contains("c2"):
      carLeft.classList.remove("c2");
      carLeft.classList.add("c3");
      break;
    case carLeft.classList.contains("c3"):
      carLeft.classList.remove("c3");
      carLeft.classList.add("c1");
      break;
  }
}

// MOVE CAR RIGHT
function moveCarRight(carRight) {
  switch (true) {
    case carRight.classList.contains("c3"):
      carRight.classList.remove("c3");
      carRight.classList.add("c2");
      break;
    case carRight.classList.contains("c2"):
      carRight.classList.remove("c2");
      carRight.classList.add("c1");
      break;
    case carRight.classList.contains("c1"):
      carRight.classList.remove("c1");
      carRight.classList.add("c3");
      break;
  }
}

// CHECK for COLLISIONS LOSE
function loseGame() {
  if(
    squares[currentIndex].classList.contains('c1') ||
    squares[currentIndex].classList.contains('l4') ||
    squares[currentIndex].classList.contains('l5') ||
    currentTime <= 0
    ) {
      displayResult.textContent = 'You LOSE!!'
      clearInterval(timerId)
      clearInterval(outcomeTimerId)
      squares[currentIndex].classList.remove('frog')
      document.removeEventListener('keyup', moveFrog)
    }
  
}

// WIN GAME
function winGame() {
  if (squares[currentIndex].classList.contains("ending-block")) {
    displayResult.textContent = "You WIN!!";
    clearInterval(timerId);
    clearInterval(outcomeTimerId)
    document.removeEventListener("keyup", moveFrog);
  }
}
// INTERVAL to MOVE LOGS
startPauseBtn.addEventListener('click', () => {
  if(timerId) {
    clearInterval(timerId)
    clearInterval(outcomeTimerId)
    timerId = null
    outcomeTimerId = null
    document.removeEventListener('keyup', moveFrog)
  }else{
    timerId = setInterval(moveElements, 1000)
    outcomeTimerId = setInterval(checkOutcomeTimer, 50)
    document.addEventListener("keyup", moveFrog);
  }
})

function resetGame() {
  currentTime = 20
  timeDown.textContent = currentTime
  displayResult.textContent = 0
}

console.log(displayResult)