function init() {

// * VARIABLES
  const grid = document.querySelector('.grid')

  const width = 10
  const cellCount = width * width
  const cells = []
  console.log('CELLS', cells)

// * GRID

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }

  }


// * EVENT LISTENERS

  createGrid()



  
}

window.addEventListener('DOMContentLoaded', init)