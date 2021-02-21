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

  const truckClass = 'truck'
  let truckCurrentPosition = 54

  const busClass = 'bus'
  let busCurrentPosition = 53

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

// * Remove car
  function removeCar(position) {
    cells[position].classList.remove(carClass)
  }
// * Move car
  function moveCar() {
    timerID = setInterval(() => {
      removeCar(carCurrentPosition)

      if (carCurrentPosition >= 71) {
        clearInterval(timerID)
      } else {
        carCurrentPosition++
      }
      addCar(carCurrentPosition)
    }, 750)
  
}

// * Add truck
  function addTruck(position) {
    cells[position].classList.add(truckClass)
  }

// * Remove truck
  function removeTruck(position) {
    cells[position].classList.remove(truckClass)
  }

// * Move truck
  function moveTruck() {
    timerID = setInterval(() => {
      removeTruck(truckCurrentPosition)

      if (truckCurrentPosition >= 62) {
        clearInterval(timerID)
      } else {
        truckCurrentPosition++
      }
      addTruck(truckCurrentPosition)
    }, 600)
  }

// * Add bus
  function addBus(position) {
    cells[position].classList.add(busClass)
  }

// * Remove bus
  function removeBus(position) {
    cells[position].classList.remove(busClass)
  }

// * Move bus
  function moveBus() {
    timerID = setInterval(() => {
      removeBus(busCurrentPosition)

      if (busCurrentPosition <= 45) {
        clearInterval(timerID)
      } else {
        busCurrentPosition--
      }
      addBus(busCurrentPosition)
    }, 600)
}

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
    }, 600)
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


// * EVENT LISTENERS

  document.addEventListener('keyup', handleKeyUp)
  
  createGrid(bearStartPosition)

  button.addEventListener('click', startTimer)
  button.addEventListener('click', moveCar)
  button.addEventListener('click', moveLog)
  button.addEventListener('click', moveTruck)
  button.addEventListener('click', moveBus)

  addCar(carStartPosition)
  addLog(logStartPosition)
  addTruck(truckCurrentPosition)
  addBus(busCurrentPosition)

  // moveCar()

  
}

window.addEventListener('DOMContentLoaded', init)