// * VARIABLES

const grid = document.querySelector('.grid')

const width = 9
const cellCount = width * width
let cells = []

// classes for grid backgrounds:
const bearClass = 'bear'
const carClass = 'car'
const logClass = 'log'
const truckClass = 'truck'
const busClass = 'bus'
const caveClass = 'cave'
const landClass = 'grass'

// document selectors
const button = document.querySelector('button')
const timerScreen = document.querySelector('.time-screen').querySelector('h3')
const totalScore = document.querySelector('#score-screen')
const 
let timeRemaining = 30
let timerID = null
let score = 0
let lives = 3

// positions
const bearStartPosition = 76
  let bearCurrentPosition = 76
  let carCurrentPosition = 63
  let logCurrentPosition = 35
  let logCurrentPosition2 = 17
  let logCurrentPosition3 = 18
  let truckCurrentPosition = 54
  let busCurrentPosition = 53

- need to know where player is, how to handle that? (when new bear added to start position after one gets home)

// * FUNCTIONS

// ! create grid
function createGrid(bearStartPosition) {
  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.textContent = i
    grid.appendChild(cell)
    cells.push(cell)
  }
}
// ! add land/grass
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

// ! add road and water
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

// ! add caves for home spots
function home() {
  const homeRow = cells.slice(0, 9)
  const homeCave = homeRow.filter((cell, index) => {
    return index % 2 !== 0
  })
  homeCave.forEach(cell => {
    cell.classList.add(caveClass)
  })
}

// ! move bear
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

// ! move obstacles 
  // - take these out of their setIntervals and place those variables globally so can CLEAR them when the game ends?
  //  - lots of similar functions for different obstacles, repetition, combine them into a class?
  // ! CAR
function moveCar() {
  timerID = setInterval(() => {
    removeCar(carCurrentPosition)

    if (carCurrentPosition === 71) {
      carCurrentPosition -= 8

    } else {
      carCurrentPosition++
    }
    addCar(carCurrentPosition)
  }, 300)
}

// ! TRUCK 
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
  }, 490)
}

// ! BUS
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

// ! LOGS
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


// ! check collision
function detectCollision() {
  if (cells[bearCurrentPosition].classList.contains(carClass) || cells[bearCurrentPosition].classList.contains(truckClass) || cells[bearCurrentPosition].classList.contains(busCurrentPosition)) {
    lives -= 1
    console.log(lives)
    addBear(bearStartPosition)
  }
}

// ! check bear in water
function fallenIntoWater() {
  if (bearCurrentPosition >= 9 && bearCurrentPosition <= 35 && cells[bearCurrentPosition].classList.contains('water')) {
    lives -= 1
  }
}

// ! check if log is present so bear can hitch a ride - how to handle going off screen and losing a life from here?
function logForRide() {
  if (cells[bearCurrentPosition].classList.contains(logClass) && bearCurrentPosition >= 9 && bearCurrentPosition < 18) {
    bearCurrentPosition--
  } else if (cells[bearCurrentPosition].classList.contains(logClass) && bearCurrentPosition >= 18 && bearCurrentPosition < 27) {
    bearCurrentPosition++
  } else if (cells[bearCurrentPosition].classList.contains(logClass) && bearCurrentPosition >= 27 && bearCurrentPosition < 36) {
    bearCurrentPosition--
  }
}




// ! check bear gets to home spot, add points to score, add bear class to that cell, update number of home spots to get the total to win 
function homeSafe() {
  if (bearCurrentPosition === 1 || bearCurrentPosition === 3 || bearCurrentPosition === 5 || bearCurrentPosition === 7) {
    score += 50
    totalScore.innerHTML = score
    // allHome += 1
    cells[bearCurrentPosition].classList.add(bearClass)
    addBear(bearStartPosition)
    
  } 
  
}

// ! End game - win
- all 4 home positions occupied
- timeRemaining > 0

function youWin() {
  

}


// ! timers
function gameTimer() {
  timerID = setInterval(() => {
    timeRemaining--
    if (timeRemaining < 0) {
      clearInterval(timerID)
      timerScreen.innerHTML = 'GAME OVER!'
      // clearGrid
    } else {
      timerScreen.innerHTML = timeRemaining
    }
  }, 1000)
}



// ! Start game 
  - press play 
  - start game timer 
  - add and move bear
  - start obstacles on timer loops
  - count home spots 

// !  End game - lose 
  - game timer runs out
  - all 3 lives lost 
  - collision detected 
  - fall into water 

  - timers stop, grid cleared, game reset



  function gameOver() {
    clearIntervals
    clearGrid
    play again pop up?
  }




// * EVENT LISTENERS
  - click on play button 
  button.addEventListener('click', gameTimer)

  - handle keyUp events 
  document.addEventListener('keyup', handleKeyUp)
