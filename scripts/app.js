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
  let logCurrentPosition2 = 17

  const truckClass = 'truck'
  let truckCurrentPosition = 54

  const busClass = 'bus'
  let busCurrentPosition = 53

  const caveClass = 'cave'
  let caveCells = []

  const landClass = 'grass'
  const landCells = [36, 37, 38, 39, 40, 41, 42, 43, 44]

  const timerScreen = document.querySelector('.time-screen').querySelector('p')
  const button = document.querySelector('button')
  let timeRemaining = 30
  let timerID = null

  // const totalScore = document.querySelector('.score').querySelector('p')
  const totalScore = document.querySelector('#score-screen')
  let score = 0
  

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

// * Clear grid for end of game
  function clearGrid() {
    removeBear(bearCurrentPosition)
    removeCar(carCurrentPosition)
    removeTruck(truckCurrentPosition)
    removeBus(busCurrentPosition)
    removeLog(logCurrentPosition)
    removeLog(logCurrentPosition2)
  }

// * Add grass for safe areas
  // function addGrass(position) {
  //   cells[position].classList.add(landClass)
  // }

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

// * Detect collision
 
    



// * Home spots
  // function home() {
  //   if (bearCurrentPosition === 1) {
  //     score += 50
  //     totalScore.innerHTML = score
  //   } else {

  //   }

  // }

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
        // clearInterval(timerID)
      } else {
        carCurrentPosition++
      }
      addCar(carCurrentPosition)
    }, 300)
  
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
    }, 680)
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
    }, 650)
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
      removeLog(logCurrentPosition2)

      if (logCurrentPosition <= 27 && logCurrentPosition2 <= 9) {
        clearInterval(timerID)
      } else {
        logCurrentPosition--
        logCurrentPosition2--
      }
      addLog(logCurrentPosition)
      addLog(logCurrentPosition2)
    }, 600, 700)
  }
  


// * Main game timer, linked to start button

  function startTimer() {
    timerID = setInterval(() => {
      timeRemaining--
      if (timeRemaining < 0) {
        clearInterval(timerID)
        clearGrid()
        
        timerScreen.innerHTML = 'GAME OVER!'
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

  addCar(carCurrentPosition)
  addLog(logCurrentPosition)
  addTruck(truckCurrentPosition)
  addBus(busCurrentPosition)
  // addGrass()
  // home()


  
}

window.addEventListener('DOMContentLoaded', init)