// Calling the elements to help the app work
const computerDisplay = document.getElementById('computer_choice');
const userDisplay = document.getElementById('user_choice');
const resultDisplay = document.getElementById('result');
// Calling the buttons
// const rockBtn = document.getElementById('rock');
// const paperkBtn = document.getElementById('paper');
// const scissorsBtn = document.getElementById('scissors');
// An other way to do it is using querySelectorAll to pick all the buttons so...
const possibleOptions = document.querySelectorAll('button'); // we use this with .forEach()

let userChoice // here is were we store the id of the buttons when the user makes his choice
let computerChoice
let result

possibleOptions.forEach(optionsbtns => 
  optionsbtns.addEventListener('click', (e) => {
    // so here for every btn we pick up the event "e". Remember to store it in a variable, especially the user choice
    userChoice = e.target.id // for user I am pick up the id of the button
    userDisplay.innerHTML = userChoice // now we are gonna see the userchoice in the span
    generateComputerChoice()
    getResult()
    resetGame()
  }))

// function for the random choice of the computer. Remember to use MathRandom
function generateComputerChoice() {
  // let computerChoice = Math.floor( Math.random() * 3) + 1
  let rNumber = Math.floor( Math.random() * possibleOptions.length ) + 1
  switch(rNumber) {
    case 1: computerChoice = 'rock'
    break;
    case 2: computerChoice = 'paper'
    break;
    default: computerChoice = 'scissors'
  }
  computerDisplay.innerHTML = computerChoice;
}

function getResult() {

  switch (userChoice + computerChoice) {
    case "rockpaper":
    case "paperscissors":
    case "scissorsrock":
      result = "You Lose!";
      break;
    case "paperrock":
    case "scissorspaper":
    case "rockscissors":
      result = "You Win!";
      break;
    case "paperpaper":
    case "scissorsscissors":
    case "rockrock":
      result = "Its a draw!";
  }
  resultDisplay.innerHTML = result;
}

function resetGame() {
  setTimeout(function () {
    userDisplay.innerHTML = ""
    computerDisplay.innerHTML = ""
    resultDisplay.innerHTML = ""
  }, 2000);
}