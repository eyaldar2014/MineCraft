// console.log('a')
let tempColor
let tempImage
// let currentTool

const newGame = document.querySelector('#newGame')
const instructions = document.querySelector('#instructions')
const matrix = document.querySelector('#matrix')
const landing = document.querySelector('#landing')
const rows = document.querySelector('#rows')
const columns = document.querySelector('#columns')
let cells
let tools = document.querySelectorAll('.toolBox')
let currentHolder = document.querySelector('#currentIcon')

let woodCounter = document.querySelector('#woodCounter')
let dirtCounter = document.querySelector('#dirtCounter')
let rockCounter = document.querySelector('#rockCounter')
let storages = document.querySelectorAll('.brickIcon')
let axe = false
let pickAxe = false
let shovel = false
let wood = false
let rock = false
let dirt = false

let digPermission = false

// console.log(currentHolder.style.background)

function createMatrix(r, c) {


  // let w = window.innerWidth;
  let h = window.innerHeight;
  let n
  let size
  let coulumnWidth

  // if (w > 600){
  size = (h / r).toString() + 'px'
  // size = '100px'
  n = (c * h / r)
  rowWidth = n.toString() + 'px'
  // }
  // else{
  //   size = '60px'
  //   n = (c * 60)
  //   coulumnWidth = n.toString() + 'px'
  // }
  // console.log(size)

  for (let rn = 0; r > rn; rn++) {
    let row = document.createElement('div')
    row.id = rn.toString()
    row.classList.add("row")
    row.style.display = 'flex'
    row.style.flexDirection = 'row'
    row.style.width = rowWidth
    matrix.appendChild(row)

    for (let cn = 0; c > cn; cn++) {

      let cell = document.createElement('div')
      cell.id = cn.toString() + 'c'
      cell.classList.add("column")
      cell.classList.add(rn)
      cell.style.width = size
      cell.style.height = size
      cell.style.border = '1px solid black' // not sure about it
      row.appendChild(cell)

      let startTreeRow = Math.floor(0.65 * r)
      let startTree = Math.floor((1 - 0.65) * c)
      let startSecondTree = Math.floor((0.65) * c)

      if (rn / r > 0.65) {
        cell.style.backgroundColor = 'brown' // dirt
        cell.style.backgroundImage = 'url(/images/blocks/soil.png)'
        cell.style.backgroundPosition = 'center'
        cell.style.backgroundSize = 'cover'
      }
      else {
        cell.style.backgroundColor = 'lightblue' // sky
      }
      // elements : 
      if (startTreeRow === rn && startTree === cn) {
        cell.style.backgroundColor = 'green'
        cell.style.backgroundImage = 'url(/images/blocks/wood.png)'
        cell.style.backgroundPosition = 'center'
        cell.style.backgroundSize = 'cover'
      }
      if (startTreeRow === rn && startSecondTree === cn) {
        cell.style.backgroundColor = 'green'
        cell.style.backgroundImage = 'url(/images/blocks/wood.png)'
        cell.style.backgroundPosition = 'center'
        cell.style.backgroundSize = 'cover'
      }
    }
  }

  cells = document.querySelectorAll('.column')
}




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


function cell(e) {
  let cell = e.srcElement

  if (axe === true && cell.style.backgroundColor === 'green') {
    cell.style.backgroundColor = 'lightblue'
    cell.style.backgroundImage = ''
    let n = parseInt(woodCounter.innerHTML) + 1
    woodCounter.innerHTML = n.toString()
  }
  else if (pickAxe === true && cell.style.backgroundColor === 'grey') {
    cell.style.backgroundColor = 'lightblue'
    cell.style.backgroundImage = ''
    let n = parseInt(rockCounter.innerHTML) + 1
    rockCounter.innerHTML = n.toString()
  }
  else if (shovel === true && cell.style.backgroundColor === 'brown') {
    checkDirt(cell)
    if (digPermission === true) {
      cell.style.backgroundColor = 'lightblue'
      cell.style.backgroundImage = ''
      let n = parseInt(dirtCounter.innerHTML) + 1
      dirtCounter.innerHTML = n.toString()
    }
    digPermission = false
  }
  else if (wood === true && cell.style.backgroundColor === 'lightblue' && parseInt(woodCounter.innerHTML)) {
    cell.style.backgroundColor = 'green'
    cell.style.backgroundImage = 'url(/images/blocks/wood.png)'
    cell.style.backgroundPosition = 'center'
    cell.style.backgroundSize = 'cover'
    let n = parseInt(woodCounter.innerHTML) - 1
    woodCounter.innerHTML = n.toString()
  }
  else if (rock === true && cell.style.backgroundColor === 'lightblue' && parseInt(rockCounter.innerHTML)) {
    cell.style.backgroundColor = 'grey'
    cell.style.backgroundImage = 'url(/images/blocks/rock.png)'
    cell.style.backgroundPosition = 'center'
    cell.style.backgroundSize = 'cover'
    let n = parseInt(rockCounter.innerHTML) - 1
    rockCounter.innerHTML = n.toString()
  }
  else if (dirt === true && cell.style.backgroundColor === 'lightblue' && parseInt(dirtCounter.innerHTML)) {
    cell.style.backgroundColor = 'brown'
    cell.style.backgroundImage = 'url(/images/blocks/soil.png)'
    cell.style.backgroundPosition = 'center'
    cell.style.backgroundSize = 'cover'
    let n = parseInt(dirtCounter.innerHTML) - 1
    dirtCounter.innerHTML = n.toString()
  }
  if (cell.style.backgroundColor !== 'lightblue') {
    checkFloating(cell)
  }
}

function tool(e) {
  
  let tool = e.srcElement
  let toolStyle = getComputedStyle(tool)
  currentHolder.style.background = toolStyle.background

  // console.log(tool.id)
  if (tool.id === 'axeBox') {
    // tool.style.border = 'grey 5px solid'
    axe = true
    pickAxe = false
    shovel = false
    wood = false
    rock = false
    dirt = false
  }
  else if (tool.id === 'pickAxeBox') {
    // tool.style.border = 'grey 5px solid'
    axe = false
    pickAxe = true
    shovel = false
    wood = false
    rock = false
    dirt = false
  }
  else if (tool.id === 'shovelBox') {
    // tool.style.border = 'grey 5px solid'
    axe = false
    pickAxe = false
    shovel = true
    wood = false
    rock = false
    dirt = false
  }
}
function putBack(e) {
  let store = e.srcElement
  let storeStyle = getComputedStyle(store)
  currentHolder.style.background = storeStyle.background
  
  if (store.id === 'woodIcon' && parseInt(woodCounter.innerHTML) > 0) {
    // store.style.border = 'grey 5px solid'
    wood = true
    rock = false
    dirt = false
    axe = false
    pickAxe = false
    shovel = false
  }
  if (store.id === 'rockIcon' && parseInt(rockCounter.innerHTML) > 0) {
    // store.style.border = 'grey 5px solid'
    wood = false
    rock = true
    dirt = false
    axe = false
    pickAxe = false
    shovel = false
  }
  if (store.id === 'dirtIcon' && parseInt(dirtCounter.innerHTML) > 0) {
    // store.style.border = 'grey 5px solid'
    wood = false
    rock = false
    dirt = true
    axe = false
    pickAxe = false
    shovel = false
  }
}


function checkDirt(cell) {
  // console.log(cell)

  let row = cell.parentElement
  let upperRow = (parseInt(row.id) - 1).toString()

  let upperCell
  cells.forEach(element => {
    if (element.parentElement.id === upperRow && element.id === cell.id) {
      upperCell = element
    }
  })

  if (upperCell.style.backgroundColor === 'lightblue') {
    digPermission = true
  }
}

function checkFloating(cell) {
  // console.log(cell)

  let row = cell.parentElement
  let underRow = (parseInt(row.id) + 1).toString()

  let underCell
  cells.forEach(element => {
    if (element.parentElement.id === underRow && element.id === cell.id) {
      underCell = element
    }
  })

  if (underCell.style.backgroundColor === 'lightblue') {
    tempColor = cell.style.backgroundColor
    tempImage = cell.style.backgroundImage
    underCell.style.backgroundColor = tempColor
    underCell.style.backgroundImage = tempImage
    underCell.style.backgroundPosition = 'center'
    underCell.style.backgroundSize = 'cover'
    cell.style.backgroundColor = 'lightblue'
    cell.style.backgroundImage = ''
    checkFloating(underCell)
  }
}

function newGameMenu() {
  newGame.style.zIndex = '100'
}
function instructionsMenu() {
  instructions.style.zIndex = '100'
}