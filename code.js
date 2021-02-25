// console.log('a')

const matrix = document.querySelector('#matrix')
const landing = document.querySelector('#landing')
const rows = document.querySelector('#rows')
const columns = document.querySelector('#columns')

// console.log(rows)


function createMatrix(r, c) {

  let w = window.innerWidth;
  w = (80/100 * w)
  // matrix.style.width = w.toString() + 'px'
  
  // console.log(matrix.style.width)

  let size
  if (w > 600){
    size = '100px'
  }
  else{
    size = '60px'
  }
  // console.log(size)

  for (let rn = 0; r > rn; rn++) {
    let column = document.createElement('div')
    column.id = rn
    column.style.display = 'flex'
    column.style.flexDirection = 'row'
    column.style.display = 'inline-block'
    matrix.appendChild(column)

    for (let cn = 0; c > cn; cn++) {

      let cell = document.createElement('div')
      
      cell.style.width = size
      cell.style.height = size
      cell.style.background = 'red'
      cell.style.border = '1px solid black'
      cell.style.display = 'inline-block'
      
      column.appendChild(cell)
    }
  }
}



function start() {
  landing.style.zIndex = '-100'
  let r = rows.value
  let c = columns.value
  createMatrix(r, c)
}