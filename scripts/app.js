function init() {

  // * VARIABLES
  const grid = document.querySelector('.grid')

  const width = 9
  const cellCount = width * width
  const cells = []
  
  const bearClass = 'bear'
  const bearStartPosition = 76
  let bearCurrentPosition = 76
  const homeBearClass = 'homeBear'


  const carClass = 'car'
  let carCurrentPosition = 63

  const logClass = 'log'
  let logCurrentPosition = 35
  let logCurrentPosition2 = 17
  let logCurrentPosition3 = 18
  
  const truckClass = 'truck'
  let truckCurrentPosition = 54

  const busClass = 'bus'
  let busCurrentPosition = 53

  const caveClass = 'cave'
  let allHome = 0

  const landClass = 'grass'

  const timerScreen = document.querySelector('.time-screen').querySelector('h3')
  const button = document.querySelector('button')
  let timeRemaining = 30
  let timerID = null

  const totalScore = document.querySelector('#score-screen')
  let score = 0
  let lives = 3
  

  // * Create grid
  function createGrid(bearStartPosition) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    land()
    home()
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
    detectCollision()
    addBear(bearCurrentPosition)
  }

  
  // // * PLayer index
  // function addPlayerIndex() {
  //   cells[bearStartPosition].classList.add(bearClass)
  // }

  // * Detect collision

  function detectCollision() {
    
    if (cells[bearCurrentPosition].classList.contains(carClass)) {
      lives -= 1
      // reset to start position
    } if (cells[bearCurrentPosition].classList.contains(truckClass)) {
      lives -= 1
    } else if (cells[bearCurrentPosition].classList.contains(busClass)) {
      lives -= 1
    }
      
  }

  // * Reset to start position
    function resetToStartPosition() {
      addBear(bearStartPosition) 
      
    }

  
  // * Fallen into water
    function fallenIntoWater() {
    if (bearCurrentPosition === 30 && cells[bearCurrentPosition].classList.contains('water')) {
      lives -= 1
    
    }
  }


  // * Home safe
  function homeSafe(event) {
    
    // const homeRow = cells.slice(0, 9)
    // const homeCave = homeRow.filter((cell, index) => {
    //   return index % 2 !== 0
    // })

    if (bearCurrentPosition === 1 || bearCurrentPosition === 3 || bearCurrentPosition === 5 || bearCurrentPosition === 7) {
      score += 50
      totalScore.innerHTML = score
      allHome += 1
      cells[bearCurrentPosition].classList.replace(caveClass, homeBearClass)
      resetToStartPosition()
      youWin()
    } 
    
  }


  // * Once all 4 homes made to
  function youWin() {
    if (cells[1].classList.contains(homeBearClass) && cells[3].classList.contains(homeBearClass) && cells[5].classList.contains(homeBearClass) && cells[7].classList.contains(homeBearClass)) {
      console.log('YOU WIN')
    } 
  }

  // * Caves for home 
  function home() {
    const homeRow = cells.slice(0, 9)
    const homeCave = homeRow.filter((cell, index) => {
      return index % 2 !== 0
    })
    homeCave.forEach(cell => {
      cell.classList.add(caveClass)
    })
  }

  // * Grass for safe spots
  function land() {
    const landRowsStart = cells.slice(72, 81)
    const landRows = cells.slice(36, 45)
    const homeRow = cells.slice(0, 9)
    const homeGrass = homeRow.filter((cell, index) => {
      return index % 2 === 0
    })
    
    homeGrass.forEach(cell => {
      cell.classList.add(landClass)
    })

    landRowsStart.forEach(cell => {
      cell.classList.add(landClass)
    })

    landRows.forEach(cell => {
      cell.classList.add(landClass)
    })
  }

  // * Add car 
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

      if (carCurrentPosition === 71 ) {
        carCurrentPosition -= 8
      } else {
        carCurrentPosition++
      }
      addCar(carCurrentPosition)
      if (carCurrentPosition === bearCurrentPosition) {
        lives -= 1
      }
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

      if (truckCurrentPosition === 62) {
        truckCurrentPosition -= 8
        // clearInterval(timerID)
      } else {
        truckCurrentPosition++
      }
      addTruck(truckCurrentPosition)
      if (truckCurrentPosition === bearCurrentPosition)
        lives -= 1
        console.log(lives)
    }, 490)
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

      if (busCurrentPosition === 45) {
        busCurrentPosition += 8
        // clearInterval(timerID)
      } else {
        busCurrentPosition--
      }
      addBus(busCurrentPosition)
    }, 415)
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

      if (logCurrentPosition === 27 && logCurrentPosition2 === 9) {
        logCurrentPosition += 8
        logCurrentPosition2 += 8
        // clearInterval(timerID)
      } else {
        logCurrentPosition--
        logCurrentPosition2--
      }
      addLog(logCurrentPosition)
      addLog(logCurrentPosition2)
    }, 500)
  }

  //* Second move log function
  function moveLog2() {
    timerID = setInterval(() => {
      removeLog(logCurrentPosition3)

      if (logCurrentPosition3 === 26) {
        logCurrentPosition3 -= 8
        // clearInterval(timerID)
      } else {
        logCurrentPosition3++
      }
      addLog(logCurrentPosition3)
  
    }, 350)
  }

  
  // * Water and road
  function waterAndRoad() {
    const waterSections = cells.slice(9, 36)
    const roadSections = cells.slice(45, 72)

    const water = waterSections.forEach(cell => {
      cell.classList.add('water')
    });

    const road = roadSections.forEach(cell => {
      cell.classList.add('road')
    })


  }



  // * Main game timer, linked to start button

  function gameTimer() {
    timerID = setInterval(() => {
      timeRemaining--
      if (timeRemaining < 0) {
        clearInterval(timerID)
        timerScreen.innerHTML = 'GAME OVER!'

      } else {
        timerScreen.innerHTML = timeRemaining
      }
    }, 1000)
  }
  


  // * Function to select road obstacle function at random
  // const roadFunctions = [moveCar, moveTruck, moveBus]
  // randomFunction = roadFunctions[Math.floor(Math.random() * (roadFunctions.length))]

  // console.log(randomFunction)

  // * Start game 
  function startGame() {
    createGrid()

  }

  // * Game Over function
  function gameOver() {
    // timeRemaining = 0
    // lives = 0 


  }

  // * EVENT LISTENERS

  document.addEventListener('keyup', handleKeyUp)

  createGrid(bearStartPosition)

  button.addEventListener('click', gameTimer)
  button.addEventListener('click', moveCar)
  button.addEventListener('click', moveLog)
  button.addEventListener('click', moveLog2)
  button.addEventListener('click', moveTruck)
  button.addEventListener('click', moveBus)

  document.addEventListener('keyup', homeSafe)

  addCar(carCurrentPosition)
  addLog(logCurrentPosition)
  addTruck(truckCurrentPosition)
  addBus(busCurrentPosition)
  land()
  home()
  waterAndRoad()
  // addPlayerIndex()
  fallenIntoWater()
  // document.addEventListener('keyup', detectCollision)
  detectCollision()
  // youWin()
  gameOver()

}

window.addEventListener('DOMContentLoaded', init)