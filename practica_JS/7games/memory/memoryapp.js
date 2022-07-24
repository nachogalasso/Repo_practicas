// First the Array-Object with the images for the game
const cardGameArray = [
  {
    name: 'burger',
    img: './images/burger.webp',
  },
  {
    name: 'cupckae',
    img: './images/cupcake.webp',
  },
  {
    name: 'emp',
    img: './images/emp.webp',
  },
  {
    name: 'fries',
    img: './images/fries.webp',
  },
  {
    name: 'mila',
    img: './images/mila.webp',
  },
  {
    name: 'pizza',
    img: './images/pizza.webp',
  },
  {
    name: 'sand',
    img: './images/sand.webp',
  },
  {
    name: 'soda',
    img: './images/soda.webp',
  },
  {
    name: 'burger',
    img: './images/burger.webp',
  },
  {
    name: 'cupckae',
    img: './images/cupcake.webp',
  },
  {
    name: 'emp',
    img: './images/emp.webp',
  },
  {
    name: 'fries',
    img: './images/fries.webp',
  },
  {
    name: 'mila',
    img: './images/mila.webp',
  },
  {
    name: 'pizza',
    img: './images/pizza.webp',
  },
  {
    name: 'sand',
    img: './images/sand.webp',
  },
  {
    name: 'soda',
    img: './images/soda.webp',
  },
  
]

// Let´s bring the elements from the HTML
const gameDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
const alertDisplay = document.querySelector('.alert');
const resetBtn = document.querySelector('.resetBtn');
const modal = document.querySelector('.modal-btn');
const time = document.querySelector('.timer');
//  empty array were the cards 'name' are gonna be pushed
let cardChosen = [] // array where the game push the cards chosen
let cardChosenId = [] // array where the game push the ID of the chosen cards
const cardsWon = [] // here is where the matched cards move.
let count = 0

// using cardGameArray.sort(() => 0.5 - Math.random()) is a shortcut to sort an array and works fine, and with every refresh of the page we are gona have all our cards ordered randomly.
cardGameArray.sort(() => 0.5 - Math.random()) // the array shuffle randomly
console.log(cardGameArray)

// function to create the game board
function gameBoard() {
  for(let i = 0; i < cardGameArray.length; i++) {
    const card = document.createElement('img')
    // once the element is created, with setAttribute we assign to the elements the source (src) or and id. No olvidar que en el 2do
    // argumento colocar dónde se encuentra la imágen
    card.setAttribute('src', './images/blank.webp')
    card.setAttribute('data-id', i)
    // call an event listener for the cards
    card.addEventListener('click', flipCard)
    // now we add the img to our div container
    gameDisplay.appendChild(card)
    // console.log(card, i)
  }
}
gameBoard()

function checkMatch() {
  // first is important to indicate where to search
  const card = document.querySelectorAll('#grid img') // here i´m telling to search all img inside grid
  const idOne = cardChosenId[0]
  const idTwo = cardChosenId[1]

  if(idOne == idTwo) {
    displayAlert("Watch out! You pick the same card");
    cardChosen.pop()
    cardChosenId.pop()
  }
  console.log(cardChosen)
  console.log(cardChosenId)

  if(cardChosen[0] == cardChosen[1]) {
    displayAlert('You got a Match!... Great!!')
    // put the cards in blank
    card[cardChosenId[0]].setAttribute("src", "./images/white.webp");
    card[cardChosenId[1]].setAttribute("src", "./images/white.webp");
    // remove the eventListener from both cards
    card[cardChosenId[0]].removeEventListener('click', flipCard)
    card[cardChosenId[1]].removeEventListener('click', flipCard)
    // push to carsdWon
    cardsWon.push(cardChosen)
  } else {
    card[idOne].setAttribute('src', './images/blank.webp')
    card[idTwo].setAttribute('src', './images/blank.webp')
    displayAlert('No Match... Try again ;)')
  }

  resultDisplay.textContent = cardsWon.length

  // reset the array and continue playing but now with less cards
  cardChosen = []
  cardChosenId = []

  if(cardsWon.length == cardGameArray.length/2) {
    resultDisplay.textContent = 'Congrats... YOU WON!!!'
    modal.classList.add('show')
    time.innerHTML = count
  }
  
}

resetBtn.addEventListener('click', resetGame)

// function to flip card when it´s clicked
function flipCard() {
  setInterval(() => {
    count++
  }, 1000)
  // remember we need to add an event listener in our game board, it´s gonna be call when the game board is created
  // use 'this' to interact with every element is clicked on the board. Is use it to access to the name of our object
  const cardId = this.getAttribute('data-id')
  cardChosenId.push(cardId);
  // console.log(cardGameArray[cardId].name);
  // RECORDAR USAR EL CONSOLE.LOG PARA VER SI ESTAMOS ACCEDIENDO A LA PROPIEDAD QUE QUEREMOS
  cardChosen.push(cardGameArray[cardId].name)
  // now is time to give the cards the correct image, let´s use 'this' again
  this.setAttribute('src', cardGameArray[cardId].img)
  if(cardChosen.length === 2) {
    setTimeout(checkMatch, 800)
  }
}

// GAME MESSAGES
function displayAlert(text) {
  alertDisplay.textContent = text

  setTimeout(function () {
    alertDisplay.textContent = ""
  }, 1000)
}

// RESET GAME
function resetGame() {
  window.location.reload()
}