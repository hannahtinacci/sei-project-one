function init() {

// * VARIABLES
  const grid = document.querySelector('.grid')

  const width = 9
  const cellCount = width * width
  const cells = []

  const bearClass = 'bear'
  const bearStartPosition = 76
  let bearCurrentPosition = 76
  
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

// * Add car to start cell
  function addCar(position) {
    cells[position].classList.add(carClass)
  }

// * Move car
  // function moveCar() {
  //   timerID = setInterval(() => {
  //     if (carStartPosition > width) {
  //       console.log()
  //     }
  //   }, 1000)
  // }

// * Add log to start cell
  function addLog(position) {
    cells[position].classList.add(logClass)
  }

// * Remove log
  function removeLog(position) {
    cells[position].classList.remove(logClass)
  }

// * Move log
  function moveLog() {
    timerID = setInterval(() => {
      removeLog(logCurrentPosition)

      if (logCurrentPosition <= 27) {
        clearInterval(timerID)
      } else {
        logCurrentPosition--
      }
      addLog(logCurrentPosition)
    }, 700)
    
  }
  


// * Main game timer, linked to start button

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

// * Timer for car animation
  function startCarObstacles(event) {
    timerID = setInterval(() => {
    

    }, 1000)
  }


// * EVENT LISTENERS

  document.addEventListener('keyup', handleKeyUp)
  
  createGrid(bearStartPosition)

  button.addEventListener('click', startTimer)
  button.addEventListener('click', startCarObstacles)
  button.addEventListener('click', moveLog)
  addCar(carStartPosition)
  addLog(logStartPosition)

  // moveCar()

  
}

window.addEventListener('DOMContentLoaded', init)