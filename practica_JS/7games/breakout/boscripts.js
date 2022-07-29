const grid = document.querySelector('.grid');
// bring the width and height from the ccs stylesheet
const blockWidth = 7
const blockHeight = 2
// User start position
const userStart = [17, 2]

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
user.style.left = '17rem'
user.style.bottom = '2rem'
grid.appendChild(user)