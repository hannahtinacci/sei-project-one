function init() {

// * VARIABLES
  const grid = document.querySelector('.grid')

  const width = 10
  const cellCount = width * width
  const cells = []

  const bearClass = 'bear'
  const bearStartPosition = 94
  let bearCurrentPosition = 94

// * GRID

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    addBear(bearStartPosition)
  }

// * Add bear (aka Frogger) to cell
  function addBear(position) {
    cells[position].classList.add(bearClass)
  }

// * Remove bear (aka Frogger) from cell
  function removeBear(position) {
    cells[position].classList.remove(bearClass)
  }

// * Move bear 
  function handleKeyUp(event) {
    const key = event.keyCode
    
    removeBear(bearCurrentPosition)

    if (key === 39 && bearCurrentPosition % width -1) {
      bearCurrentPosition++
    } else if (key === 37 && bearCurrentPosition % width !== 0) {
      bearCurrentPosition--
    } else if (key === 38 && bearCurrentPosition >= width) {
      bearCurrentPosition -= width
    } else if (key === 40 && bearCurrentPosition + width <= width * width - 1) {
      bearCurrentPosition += width
    } else {
      console.log('INVALID KEY')
    }

    addBear(bearCurrentPosition)
  }

// * EVENT LISTENERS

  document.addEventListener('keyup', handleKeyUp)
  
  createGrid()



  
}

window.addEventListener('DOMContentLoaded', init)