// console.log('a')

const matrix = document.querySelector('#matrix')
const landing = document.querySelector('#landing')
const rows = document.querySelector('#rows')
const columns = document.querySelector('#columns')

// console.log(rows)


function createMatrix(r, c) {

  let w = window.innerWidth;
  let h = window.innerHeight;
  let n
  let size
  let coulumnWidth

  if (w > 600){
    size = (h/r).toString() + 'px'
    // size = '100px'
    n = (c * h / r)
    coulumnWidth = n.toString() + 'px'
  }
  else{
    size = '60px'
    n = (c * 60)
    coulumnWidth = n.toString() + 'px'
  }
  // console.log(size)

  for (let rn = 0; r > rn; rn++) {
    let column = document.createElement('div')
    column.id = rn
    column.style.display = 'flex'
    column.style.flexDirection = 'row'
    console.log(coulumnWidth)
    column.style.width = coulumnWidth
    matrix.appendChild(column)

    for (let cn = 0; c > cn; cn++) {

      let cell = document.createElement('div')
      cell.id = cn
      cell.style.width = size
      cell.style.height = size
      cell.style.border = '1px solid black'
      column.appendChild(cell)
      if (rn / r > 0.65) {
        cell.style.background = 'red'
      }
      else{
        cell.style.background = 'blue'
      }
    }
  }

  let tree
  let treeStart = Math.floor(0.65*r)
  treeStart = treeStart.toString()
  console.log(treeStart)
  treeStart = document.getElementById('29')
  // treeStart = document.querySelector(treeStart)
  console.log(treeStart)
  treeStart.style.background = 'green'
}




function start() {
  landing.style.zIndex = '-100'
  let r = rows.value
  let c = columns.value
  createMatrix(r, c)
}