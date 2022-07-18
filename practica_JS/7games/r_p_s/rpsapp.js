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

/* game images */
const choices = [
  {
    id: 1,
    name: "rock",
    img: "./icons/rock_nobg.webp",
  },
  {
    id: 2,
    name: "paper",
    img: "./icons/paper_nobg.webp",
  },
  {
    id: 3,
    name: "scissors",
    img: "./icons/scissors_nobg.webp",
  },
];

console.log(choices[0].name)

let userChoice // here is were we store the id of the buttons when the user makes his choice
let computerChoice
let result

possibleOptions.forEach(optionsbtns => 
  optionsbtns.addEventListener('click', (e) => {
    // so here for every btn we pick up the event "e". Remember to store it in a variable, especially the user choice
    userChoice = e.target.id // for user I am pick up the id of the button
    if(userChoice === 'rock') {
      userDisplay.src = choices[0].img
    }else if(userChoice === 'paper') {
      userDisplay.src = choices[1].img
    }else{
      userDisplay.src = choices[2].img
    }
    // userDisplay.innerHTML = userChoice // now we are gonna see the userchoice in the span
    generateComputerChoice()
    getResult()
    resetGame()
  }))

// function to access the picture
// function choiceIcon() {
//   for(let i=0; i<choices.length ;i++) {
//     if(userChoice === 'rock' || computerChoice === 'rock') {
//       userDisplay.src = choices[i].img
//       computerDisplay.src = choices[i].img
//     }else if(userChoice === 'rock')
//   }

//   userDisplay.src = item.img;
// }

// function for the random choice of the computer. Remember to use MathRandom
function generateComputerChoice() {
  // let computerChoice = Math.floor( Math.random() * 3) + 1
  let rNumber = Math.floor( Math.random() * possibleOptions.length ) + 1
  // let rNumber = choices[Math.floor( Math.random() * choices.length)]
  switch(rNumber) {
    case 1: 
      computerChoice = 'rock'
      computerDisplay.src = choices[0].img;
    break;
    case 2: 
      computerChoice = 'paper'
      computerDisplay.src = choices[1].img;
    break;
    default: 
      computerChoice = 'scissors'
      computerDisplay.src = choices[2].img;
  }
  // computerDisplay.src = choices[rNumber].img;
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
    userDisplay.src = ""
    computerDisplay.src = ""
    resultDisplay.innerHTML = ""
  }, 2000);
}