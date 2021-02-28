let cloudsRow
let mainRow
let cells = []

let rowNumbers
let columnNumbers
const newGame = document.querySelector('#newGame')
const instructions = document.querySelector('#instructions')
const markets = document.querySelector('#markets')
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
let woodCounterDeal = document.querySelector('#woodCounterDeal')
let rockCounterDeal = document.querySelector('#rockCounterDeal')
let dirtCounterDeal = document.querySelector('#dirtCounterDeal')
let bushCounterDeal = document.querySelector('#bushCounterDeal')
let dealIcon = document.querySelectorAll('.dealIcon')



let booleanParameters = {}
booleanParameters.axe = false
booleanParameters.pickAxe = false
booleanParameters.shovel = false
booleanParameters.wood = false
booleanParameters.rock = false
booleanParameters.dirt = false
booleanParameters.bush = false
// console.log(booleanParameters)

let digPermission = false



function start() {
  // console.log(columns.value)
  if (columns.value < 15 || rows.value < 15) {
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
  // console.log(cells)
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

  rowNumbers = r
  columnNumbers = c

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

      let borderRow = Math.floor(0.65 * r) + 1

      if (rn / r > 0.65) {
        cell.classList.add('dirt')
      }
      else {
        cell.classList.add('sky')
      }
      if (borderRow - 1 === rn) {
        cell.classList.remove('sky')
        cell.classList.add('bush')
        mainRow = borderRow - 1
      }
      if (borderRow - 2 === rn) {
        cell.classList.remove('sky')
        cell.classList.add('bush')
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

  let cell = e.srcElement

  if (booleanParameters.axe === true && cell.className === 'wood') {
    cell.classList.remove('wood')
    cell.classList.add('sky')
    let n = parseInt(woodCounter.innerHTML) + 1
    woodCounter.innerHTML = n.toString()
  }
  else if (booleanParameters.axe === true && cell.className === 'bush') {
    // console.log(cell)
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

function checkDirt(cell) {
  // console.log(cell)

  let oneCellUp = parseInt(cell.id) - columnNumbers

  oneCellUp = oneCellUp.toString()
  oneCellUp = document.getElementById(oneCellUp)

  if (oneCellUp.className === 'sky') {
    digPermission = true
  }
}

function checkFloating(cell) {
  // console.log(cell)

  let oneCellUnder = parseInt(cell.id) + parseInt(columnNumbers)

  oneCellUnder = oneCellUnder.toString()
  oneCellUnder = document.getElementById(oneCellUnder)
  // console.log(oneCellUnder)

  if (oneCellUnder.className === 'sky' || oneCellUnder.className === 'cloud') {
    oneCellUnder.className = cell.className
    cell.className = 'sky'
    checkFloating(oneCellUnder)
  }
}



function createElements() {

  cloudsRow = parseInt(mainRow) / 2
  cloudsRow = Math.floor(cloudsRow)
  cloudsRow = document.getElementById(cloudsRow.toString())
  // console.log(cloudsRow)
  cloudsRow = cloudsRow.childNodes

  cloudsRow.forEach(x => {
    if (parseInt(x.id) % 11 === 0) {
      x.className = 'cloud'

      let number = 0
      number = parseInt(columnNumbers)
      for (let i = 0; i < rowNumbers * 0.1; i++) {
        let temp = (parseInt(x.id) - number).toString()
        document.getElementById(temp).className = 'cloud'
        temp = (parseInt(x.id) - number - 1).toString()
        document.getElementById(temp).className = 'cloud'
        temp = (parseInt(x.id) - number - 2).toString()
        document.getElementById(temp).className = 'cloud'
        temp = (parseInt(x.id) - number - 3).toString()
        document.getElementById(temp).className = 'cloud'
        number = number + parseInt(columnNumbers)
      }
    }
  })

  let secondCloudsRow = parseInt(mainRow) / 2
  secondCloudsRow = Math.floor(secondCloudsRow)
  secondCloudsRow = secondCloudsRow + 2
  secondCloudsRow = document.getElementById(secondCloudsRow.toString())
  secondCloudsRow = secondCloudsRow.childNodes

  secondCloudsRow.forEach(x => {
    if (parseInt(x.id) % 11 === 1) {

      let number = 0
      number = parseInt(columnNumbers)
      for (let i = 0; i < rowNumbers * 0.1; i++) {
        let temp = (parseInt(x.id) - number).toString()
        document.getElementById(temp).className = 'cloud'
        temp = (parseInt(x.id) - number - 1).toString()
        document.getElementById(temp).className = 'cloud'
        temp = (parseInt(x.id) - number - 2).toString()
        document.getElementById(temp).className = 'cloud'
        temp = (parseInt(x.id) - number - 3).toString()
        document.getElementById(temp).className = 'cloud'
        number = number + parseInt(columnNumbers)
      }
    }
  })

  mainRow = document.getElementById(mainRow.toString())
  mainRow = mainRow.childNodes
  mainRow.forEach(x => {
    if (parseInt(x.id) % 10 === 0 && parseInt(x.id) % 3 !== 0) {
      x.className = 'wood'

      let number = 0
      number = parseInt(columnNumbers)
      for (let i = 0; i < rowNumbers * 0.3; i++) {
        let temp = (parseInt(x.id) - number).toString()
        document.getElementById(temp).className = 'wood'
        number = number + parseInt(columnNumbers)
      }
      for (let i = 0; i < rowNumbers * 0.15; i++) {
        let temp = (parseInt(x.id) - number).toString()
        document.getElementById(temp).className = 'bush'
        temp = (parseInt(x.id) - number + 2).toString()
        document.getElementById(temp).className = 'bush'
        temp = (parseInt(x.id) - number - 1).toString()
        document.getElementById(temp).className = 'bush'
        temp = (parseInt(x.id) - number - 2).toString()
        document.getElementById(temp).className = 'bush'

        number = number + parseInt(columnNumbers)
      }

      number = 0
      for (let i = 0; i < rowNumbers * 0.35 + 1; i++) {
        let temp = (parseInt(x.id) - number + 1).toString()
        document.getElementById(temp).className = 'wood'
        number = number + parseInt(columnNumbers)
      }
      for (let i = 0; i < rowNumbers * 0.11; i++) {
        let temp = (parseInt(x.id) - number + 1).toString()
        document.getElementById(temp).className = 'bush'
        number = number + parseInt(columnNumbers)
      }
    }
    if (parseInt(x.id) % 19 === 0) {

      let number = 0
      number = parseInt(columnNumbers)
      for (let i = 0; i < rowNumbers * 0.1; i++) {
        let temp = (parseInt(x.id) - number).toString()
        document.getElementById(temp).className = 'rock'
        temp = (parseInt(x.id) - number + 1).toString()
        document.getElementById(temp).className = 'rock'
        temp = (parseInt(x.id) - number + 2).toString()
        document.getElementById(temp).className = 'rock'
        temp = (parseInt(x.id) - number + 3).toString()
        document.getElementById(temp).className = 'rock'

        number = number + parseInt(columnNumbers)
      }
    }
  })
}

function market() {
  markets.style.zIndex = '100'
  
  dealIcon.forEach(element => {
    element.addEventListener('click', trade, true)
  });

  woodCounterDeal.innerHTML = woodCounter.innerHTML
  rockCounterDeal.innerHTML = rockCounter.innerHTML
  dirtCounterDeal.innerHTML = dirtCounter.innerHTML
  bushCounterDeal.innerHTML = bushCounter.innerHTML

}

function endMarket() {
  markets.style.zIndex = '-100'
}


let resourceParameters = {}
resourceParameters.wood = false
resourceParameters.rock = false
resourceParameters.dirt = false
resourceParameters.bush = false

function trade(e) {
  let resource = e.srcElement 
  let resourceStyle = getComputedStyle(resource)
  currentResourceIcon.style.background = resourceStyle.background

  if (resource.id === 'woodIconDeal' && parseInt(woodCounterDeal.innerHTML) > 1){

  }
}
// if (store.id === 'woodIcon' && parseInt(woodCounter.innerHTML) > 0) {

// function putBack(e) {
//   let store = e.srcElement
//   let storeStyle = getComputedStyle(store)
//   currentHolder.style.background = storeStyle.background

//   if (store.id === 'woodIcon' && parseInt(woodCounter.innerHTML) > 0) {
//     falseCheck()
//     booleanParameters.wood = true
//   }
//   if (store.id === 'rockIcon' && parseInt(rockCounter.innerHTML) > 0) {
//     falseCheck()
//     booleanParameters.rock = true
//   }
//   if (store.id === 'dirtIcon' && parseInt(dirtCounter.innerHTML) > 0) {
//     falseCheck()
//     booleanParameters.dirt = true
//   }
//   if (store.id === 'bushIcon' && parseInt(bushCounter.innerHTML) > 0) {
//     falseCheck()
//     booleanParameters.bush = true
//   }
// }

function resourceCheck() {
  for (let key in resourceParameters) {
    resourceParameters[key] = false
  }
}