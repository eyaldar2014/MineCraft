// console.log('a')
let temp
let currentTool

const matrix = document.querySelector('#matrix')
const landing = document.querySelector('#landing')
const rows = document.querySelector('#rows')
const columns = document.querySelector('#columns')
let cells
let tools = document.querySelectorAll('.toolBox')

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

// console.log(storages)

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
      cell.style.border = '1px solid black'
      row.appendChild(cell)

      let startTreeRow = Math.floor(0.65 * r)
      let startTree = Math.floor((1 - 0.65) * c)
      let startSecondTree = Math.floor((0.65) * c)

      if (rn / r > 0.65) {
        cell.style.background = 'brown' // dirt
        cell.classList.add("dirt")
      }
      else {
        cell.style.background = 'blue' // sky
        cell.classList.add("sky")
      }
      // elements : 
      if (startTreeRow === rn && startTree === cn) {
        cell.style.background = 'green'
      }
      if (startTreeRow === rn && startSecondTree === cn) {
        cell.style.background = 'green'
      }
    }
  }

  cells = document.querySelectorAll('.column')
}




function start() {
  landing.style.zIndex = '-100'
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

  if (axe === true && cell.style.background === 'green') {
    cell.style.background = 'blue'
    let n = parseInt(woodCounter.innerHTML) + 1
    woodCounter.innerHTML = n.toString()
  }
  else if (pickAxe === true && cell.style.background === 'grey') {
    cell.style.background = 'blue'
    let n = parseInt(rockCounter.innerHTML) + 1
    rockCounter.innerHTML = n.toString()
  }
  else if (shovel === true && cell.style.background === 'brown') {
    checkDirt(cell)
    if (digPermission === true) {
      cell.style.background = 'blue'
      let n = parseInt(dirtCounter.innerHTML) + 1
      dirtCounter.innerHTML = n.toString()
    }
    digPermission = false
  }
  else if (wood === true && cell.style.background === 'blue' && parseInt(woodCounter.innerHTML)) {
    cell.style.background = 'green'
    let n = parseInt(woodCounter.innerHTML) - 1
    woodCounter.innerHTML = n.toString()
  }
  else if (rock === true && cell.style.background === 'blue' && parseInt(rockCounter.innerHTML)) {
    cell.style.background = 'grey'
    let n = parseInt(rockCounter.innerHTML) - 1
    rockCounter.innerHTML = n.toString()
  }
  else if (dirt === true && cell.style.background === 'blue' && parseInt(dirtCounter.innerHTML)) {
    cell.style.background = 'brown'
    let n = parseInt(dirtCounter.innerHTML) - 1
    dirtCounter.innerHTML = n.toString()
  }
  if (cell.style.background !== 'blue'){
  checkFloating(cell)
  }
}

function tool(e) {
  let tool = e.srcElement
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
  cells.forEach(element=>{
    if (element.parentElement.id === upperRow && element.id === cell.id){
      upperCell = element
    }
  })

  if (upperCell.style.background === 'blue'){
    digPermission = true
  }
}

function checkFloating(cell) {
  // console.log(cell)

  let row = cell.parentElement
  let underRow = (parseInt(row.id) + 1).toString()

  let underCell
  cells.forEach(element=>{
    if (element.parentElement.id === underRow && element.id === cell.id){
      underCell = element
    }
  })

  if (underCell.style.background === 'blue'){
    temp = cell.style.background
    // console.log(temp)
    underCell.style.background = temp
    cell.style.background = 'blue'
    checkFloating(underCell)
  }
}