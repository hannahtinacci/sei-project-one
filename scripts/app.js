function init() {

// * VARIABLES
  const grid = document.querySelector('.grid')

  const width = 9
  const cellCount = width * width
  const cells = []

  const bearClass = 'bear'
  const bearStartPosition = 76
  let bearCurrentPosition = 76

  const grassCells = [36, 37, 38, 39, 40, 41, 42, 43, 44]
  
  const carClass = 'car'
  const carStartPosition = 63
  let carCurrentPosition = 63

  const logClass = 'log'
  const logStartPosition = 35
  let logCurrentPosition = 35

  const timerScreen = document.querySelector('.time-screen p')
  const button = document.querySelector('button')
  let timeRemaining = 30
  let timerID = null

// * GRID
  function createGrid(bearStartPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    addBear(bearStartPosition)
  }

// * Add grass for safe areas


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

    if (key === 39 && bearCurrentPosition % width - 1) {
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


// * Main game timer

  function startTimer(event) {
    timerID = setInterval(() => {
      timeRemaining--
      if (timeRemaining < 0) {
        clearInterval(timerID)
        timerScreen.classList.add('animate_flash')
      } else {
        timerScreen.innerHTML = timeRemaining
      }
    }, 1000)
  }

// * 

// * Add car to start cell
  function addCar(position) {
    cells[position].classList.add(carClass)
  }

// * Add log to start cell
  function addLog(position) {
    cells[position].classList.add(logClass)
  }

// * EVENT LISTENERS

  document.addEventListener('keyup', handleKeyUp)
  
  createGrid(bearStartPosition)

  button.addEventListener('click', startTimer)
  // button.addEventListener('click', startRoadObstacles)

  addCar(carStartPosition)
  addLog(logStartPosition)

  
}

window.addEventListener('DOMContentLoaded', init)