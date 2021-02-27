



// let tempColor
// let tempImage
let mainRow
let cells = []

const newGame = document.querySelector('#newGame')
const instructions = document.querySelector('#instructions')
const matrix = document.querySelector('#matrix')
const landing = document.querySelector('#landing')
const rows = document.querySelector('#rows')
const columns = document.querySelector('#columns')
let tools = document.querySelectorAll('.toolBox')
let currentHolder = document.querySelector('#currentIcon')
let gameSpace = document.querySelector('#game')
let cursorClass = document.querySelector('.cursor')
let woodCounter = document.querySelector('#woodCounter')
let dirtCounter = document.querySelector('#dirtCounter')
let rockCounter = document.querySelector('#rockCounter')
let storages = document.querySelectorAll('.brickIcon')

let booleanParameters = {

}
// let axe = false
// let pickAxe = false
// let shovel = false
// let wood = false
// let rock = false
// let dirt = false
// let bush = false
booleanParameters.axe = false
booleanParameters.pickAxe = false
booleanParameters.shovel = false
booleanParameters.wood = false
booleanParameters.rock = false
booleanParameters.dirt = false
booleanParameters.bush = false
console.log(booleanParameters)

let digPermission = true



function start() {
  // console.log(columns.value)
  if (columns.value < 10 || rows.value < 10) {
    return
  }

  landing.style.zIndex = '-100'
  newGame.style.zIndex = '-100'
  let r = rows.value
  let c = columns.value
  createMatrix(r, c)
  gameOn()
}

function gameOn() {
  console.log(cells)
  cells.forEach(element => {
    element.addEventListener('click', cell, true)
  });
}

tools.forEach(element => {
  element.addEventListener('click', tool, true)
})

storages.forEach(element => {
  element.addEventListener('click', putBack, true)
})

function newGameMenu() {
  newGame.style.zIndex = '100'
}
function instructionsMenu() {
  instructions.style.zIndex = '100'
}

function createMatrix(r, c) {

  let number = parseInt(r)

  let h = window.innerHeight;
  let size
  size = (h / r).toString() + 'px'
  n = (c * h / r)
  rowWidth = n.toString() + 'px'

  for (let rn = 0; r > rn; rn++) {
    let row = document.createElement('div')
    row.id = rn.toString()
    row.style.display = 'flex'
    row.style.flexDirection = 'row'
    row.style.width = rowWidth
    matrix.appendChild(row)


    for (let cn = 0; c > cn; cn++) {
      anotherNumber = cn
      let cell = document.createElement('div')
      cell.id = number + cn
      cell.style.width = size
      cell.style.height = size
      cell.style.border = '1px solid black' // not sure about it
      cells.push(cell)
      row.appendChild(cell)

      let mainRow = Math.floor(0.65 * r) + 1

      if (rn / r > 0.65) {
        cell.classList.add('dirt')
        // cell.style.backgroundColor = 'brown' // dirt
        // cell.style.backgroundImage = 'url(/images/blocks/soil.png)'
        // cell.style.backgroundPosition = 'center'
        // cell.style.backgroundSize = 'cover'
      }
      else {
        cell.classList.add('sky')
        // cell.style.backgroundColor = 'lightblue' // sky
      }
      // bush/tree-leaves.brick : 
      if (mainRow - 1 === rn) {
        cell.classList.remove('sky')
        cell.classList.add('bush')
        // cell.style.backgroundColor = 'yellow'
        // cell.style.backgroundImage = 'url(/images/blocks/tree-leaves.png)'
        // cell.style.backgroundPosition = 'center'
        // cell.style.backgroundSize = 'cover'
      }
      if (mainRow - 2 === rn) {
        cell.classList.remove('sky')
        cell.classList.add('bush')
        // cell.style.backgroundColor = 'yellow'
        // cell.style.backgroundImage = 'url(/images/blocks/tree-leaves.png)'
        // cell.style.backgroundPosition = 'center'
        // cell.style.backgroundSize = 'cover'
        // mainRow = cell.parentElement
      }
    }
    number = parseInt(number) + parseInt(c)

  }
  // console.log(cells)
  createElements()
}


function tool(e) {

  let tool = e.srcElement
  let toolStyle = getComputedStyle(tool)
  currentHolder.style.background = toolStyle.background

  if (tool.id === 'axeBox') {
    falseCheck()
    booleanParameters.axe = true
  }
  else if (tool.id === 'pickAxeBox') {
    falseCheck()
    booleanParameters.pickAxe = true
  }
  else if (tool.id === 'shovelBox') {
    falseCheck()
    booleanParameters.shovel = true
  }
}


function putBack(e) {
  let store = e.srcElement
  let storeStyle = getComputedStyle(store)
  currentHolder.style.background = storeStyle.background

  if (store.id === 'woodIcon' && parseInt(woodCounter.innerHTML) > 0) {
    falseCheck()
    booleanParameters.wood = true
  }
  if (store.id === 'rockIcon' && parseInt(rockCounter.innerHTML) > 0) {
    falseCheck()
    booleanParameters.rock = true
  }
  if (store.id === 'dirtIcon' && parseInt(dirtCounter.innerHTML) > 0) {
    falseCheck()
    booleanParameters.dirt = true
  }
  if (store.id === 'bushIcon' && parseInt(bushCounter.innerHTML) > 0) {
    falseCheck()
    booleanParameters.bush = true
  }
}

function falseCheck() {
  for (let key in booleanParameters) {
    booleanParameters[key] = false
  }
}



function cell(e) {
  // console.log('here')
  // console.log(booleanParameters)

  let cell = e.srcElement

  // console.log(cell)
  // console.log(cell.className)
  if (booleanParameters.axe === true && cell.className === 'wood') {
    cell.classList.remove('wood')
    cell.classList.add('sky')
    let n = parseInt(woodCounter.innerHTML) + 1
    woodCounter.innerHTML = n.toString()
  }
  else if (booleanParameters.axe === true && cell.className === 'bush') {
    console.log(cell)
    cell.classList.remove('bush')
    cell.classList.add('sky')
    let n = parseInt(bushCounter.innerHTML) + 1
    bushCounter.innerHTML = n.toString()
  }
  else if (booleanParameters.pickAxe === true && cell.className === 'rock') {
    cell.classList.remove('rock')
    cell.classList.add('sky')
    let n = parseInt(rockCounter.innerHTML) + 1
    rockCounter.innerHTML = n.toString()
  }
  else if (booleanParameters.shovel === true && cell.className === 'dirt') {
    checkDirt(cell)
    if (digPermission === true) {
      cell.classList.remove('dirt')
      cell.classList.add('sky')
      let n = parseInt(dirtCounter.innerHTML) + 1
      dirtCounter.innerHTML = n.toString()
    }
    digPermission = false
  }
  else if (booleanParameters.wood === true && cell.className === 'sky' && parseInt(woodCounter.innerHTML) > 0) {
    cell.classList.remove('sky')
    cell.classList.add('wood')
    let n = parseInt(woodCounter.innerHTML) - 1
    woodCounter.innerHTML = n.toString()
  }
  else if (booleanParameters.bush === true && cell.className === 'sky' && parseInt(bushCounter.innerHTML) > 0) {

    // console.log(tool)
    cell.classList.remove('sky')
    cell.classList.add('bush')
    let n = parseInt(bushCounter.innerHTML) - 1
    bushCounter.innerHTML = n.toString()
  }
  else if (booleanParameters.rock === true && cell.className === 'sky' && parseInt(rockCounter.innerHTML) > 0) {
    cell.classList.remove('sky')
    cell.classList.add('rock')

    let n = parseInt(rockCounter.innerHTML) - 1
    rockCounter.innerHTML = n.toString()
  }
  else if (booleanParameters.dirt === true && cell.className === 'sky' && parseInt(dirtCounter.innerHTML) > 0) {
    cell.classList.remove('sky')
    cell.classList.add('dirt')

    let n = parseInt(dirtCounter.innerHTML) - 1
    dirtCounter.innerHTML = n.toString()
  }
  if (cell.className !== 'sky') {
    checkFloating(cell)
  }
}



function createElements() {

}


function checkDirt(cell) {
  // console.log(cell)

  // let row = cell.parentElement
  // let upperRow = (parseInt(row.id) - 1).toString()

  // let upperCell
  // cells.forEach(element => {
  //   if (element.parentElement.id === upperRow && element.id === cell.id) {
  //     upperCell = element
  //   }
  // })

  // if (upperCell.style.backgroundColor === 'lightblue') {
  //   digPermission = true
  // }
}

function checkFloating(cell) { // digpermission
  // console.log(cell)

  // let row = cell.parentElement
  // let underRow = (parseInt(row.id) + 1).toString()

  // let underCell
  // cells.forEach(element => {
  //   if (element.parentElement.id === underRow && element.id === cell.id) {
  //     underCell = element
  //   }
  // })

  // if (underCell.style.backgroundColor === 'lightblue') {
  //   tempColor = cell.style.backgroundColor
  //   tempImage = cell.style.backgroundImage
  //   underCell.style.backgroundColor = tempColor
  //   underCell.style.backgroundImage = tempImage
  //   underCell.style.backgroundPosition = 'center'
  //   underCell.style.backgroundSize = 'cover'
  //   cell.style.backgroundColor = 'lightblue'
  //   cell.style.backgroundImage = ''
  //   checkFloating(underCell)
  // }
}