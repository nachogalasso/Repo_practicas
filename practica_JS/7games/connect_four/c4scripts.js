// Lets try to create the game with DOMContentLoaded so =>

document.addEventListener('DOMContentLoaded', () => {

  const grid = document.querySelector('.grid')
  const squares = document.querySelectorAll('.grid div')
  const result = document.getElementById('result');
  const displayCurrentPlayer = document.querySelector('#current_player')
  const modals = document.querySelectorAll('.modal')
  console.log(modals)
  
  let currentPlayer = 1

  const winningArrays = [
    [0, 1, 2, 3],
    [41, 40, 39, 38],
    [7, 8, 9, 10],
    [34, 33, 32, 31],
    [14, 15, 16, 17],
    [27, 26, 25, 24],
    [21, 22, 23, 24],
    [20, 19, 18, 17],
    [28, 29, 30, 31],
    [13, 12, 11, 10],
    [35, 36, 37, 38],
    [6, 5, 4, 3],
    [0, 7, 14, 21],
    [41, 34, 27, 20],
    [1, 8, 15, 22],
    [40, 33, 26, 19],
    [2, 9, 16, 23],
    [39, 32, 25, 18],
    [3, 10, 17, 24],
    [38, 31, 24, 17],
    [4, 11, 18, 25],
    [37, 30, 23, 16],
    [5, 12, 19, 26],
    [36, 29, 22, 15],
    [6, 13, 20, 27],
    [35, 28, 21, 14],
    [0, 8, 16, 24],
    [41, 33, 25, 17],
    [7, 15, 23, 31],
    [34, 26, 18, 10],
    [14, 22, 30, 38],
    [27, 19, 11, 3],
    [35, 29, 23, 17],
    [6, 12, 18, 24],
    [28, 22, 16, 10],
    [13, 19, 25, 31],
    [21, 15, 9, 3],
    [20, 26, 32, 38],
    [36, 30, 24, 18],
    [5, 11, 17, 23],
    [37, 31, 25, 19],
    [4, 10, 16, 22],
    [2, 10, 18, 26],
    [39, 31, 23, 15],
    [1, 9, 17, 25],
    [40, 32, 24, 16],
    [9, 17, 25, 33],
    [8, 16, 24, 32],
    [11, 17, 23, 29],
    [12, 18, 24, 30],
    [1, 2, 3, 4],
    [5, 4, 3, 2],
    [8, 9, 10, 11],
    [12, 11, 10, 9],
    [15, 16, 17, 18],
    [19, 18, 17, 16],
    [22, 23, 24, 25],
    [26, 25, 24, 23],
    [29, 30, 31, 32],
    [33, 32, 31, 30],
    [36, 37, 38, 39],
    [40, 39, 38, 37],
    [7, 14, 21, 28],
    [8, 15, 22, 29],
    [9, 16, 23, 30],
    [10, 17, 24, 31],
    [11, 18, 25, 32],
    [12, 19, 26, 33],
    [13, 20, 27, 34],
  ];

  const squareWin = []
  
  function checkBoard() {
    // I´m telling to go trought squares and then enter winningArray for each loop to check the 1st item
    for(let y = 0; y < winningArrays.length; y++) {
      const square1 = squares[winningArrays[y][0]];
      const square2 = squares[winningArrays[y][1]];
      const square3 = squares[winningArrays[y][2]];
      const square4 = squares[winningArrays[y][3]];
      
      if(
        square1.classList.contains('player_one') &&
        square2.classList.contains('player_one') &&
        square3.classList.contains('player_one') &&
        square4.classList.contains('player_one')
      ) {
        modals[0].classList.add('show ')
        result.textContent = 'Player One WINS'
      }
      if(
        square1.classList.contains('player_two') &&
        square2.classList.contains('player_two') &&
        square3.classList.contains('player_two') &&
        square4.classList.contains('player_two')
      ) {
        result.textContent = 'Player Two WINS'
      }
    }
  }
  
 

  for(let i = 0; i < squares.length; i++) {
    squares[i].onclick = () => {
      // remember if the square below is taken you can go on top of it
      if (squares[i + 7].classList.contains("taken")) {
        if (currentPlayer == 1) {
          squares[i].classList.add("taken");
          squares[i].classList.add("player_one");
          currentPlayer = 2;
          displayCurrentPlayer.textContent = currentPlayer;
        } else if (currentPlayer == 2) {
          squares[i].classList.add("taken");
          squares[i].classList.add("player_two");
          currentPlayer = 1;
          displayCurrentPlayer.textContent = currentPlayer;
        }
      } else {
        console.log("Cant go here!!");
      }
      checkBoard()
    }
    // if(result.textContent == 'Player One Wins') {
      
    // }
  }

})


// This is one way to inject HTML code with JAVASCRIPT!!! Works AWESOME
// const fragment = document.createDocumentFragment()

// function createCircles() {
//   for(let i=0; i < 42; i++) {
//     const circle = document.createElement('div')
//     fragment.appendChild(circle)
//   }
//   for(let j=0; j < 7; j++) {
//     const circleTaken = document.createElement('div')
//     circleTaken.classList.add('taken')
//     fragment.appendChild(circleTaken)
//   }
//   grid.appendChild(fragment)
// }
// document.addEventListener('DOMContentLoaded', createCircles)