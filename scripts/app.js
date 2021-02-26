function init() {

  // * VARIABLES
  // Grid

  const grid = document.querySelector('.grid')
  const width = 9
  const cellCount = width * width
  const cells = []
  
  // Grid background classes
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
  const landClass = 'grass'
  const beenHitClass = 'ouch'
  const audio = document.querySelector('.audio')
  const carAudio = document.querySelector('.car-audio')

  // Document selectors and timers
  const timerScreen = document.querySelector('.time-screen').querySelector('h3')
  const button = document.querySelector('button')
  let timeRemaining = 30
  let timerIDGame = null
  let timerIDCar = null
  let timerIDTruck = null
  let timerIDBus = null
  let timerIDLog1 = null
  let timerIDLog2 = null
  let timerIDLog3 = null

  const totalScore = document.querySelector('#score-screen')
  let score = 0
  const livesLeft = document.querySelector('.lives').querySelector('h3')
  let lives = 3
  const introScreen = document.querySelector('.intro-screen')
 
  

  // * FUNCTIONS - initial set up and obstacles

  // Create grid
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

  // Caves for home 
  function home() {
    const homeRow = cells.slice(0, 9)
    const homeCave = homeRow.filter((cell, index) => {
      return index % 2 !== 0
    })
    homeCave.forEach(cell => {
      cell.classList.add(caveClass)
    })
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

  // Grass for safe spots
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

  // * Add bear (aka Frogger) to cell
  function addBear(position) {
    cells[position].classList.add(bearClass)
  }

  // * Remove bear (aka Frogger) from cell
  function removeBear(position) {
    cells[position].classList.remove(bearClass)
  }

  // Move bear 
  function moveBear(event) {
    const key = event.keyCode
    
    removeBear(bearCurrentPosition)

    if (key === 39 && (bearCurrentPosition + 1) % width !== 0) {
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
  
  // * Bear back to start position
  function backToStart() {
    removeBear(bearCurrentPosition)
    bearCurrentPosition += (Math.abs(76 - bearCurrentPosition))
    addBear(bearCurrentPosition)
  }
  
  // Detect collision

  function detectCollision() {
    if (cells[bearCurrentPosition].classList.contains(carClass) || cells[bearCurrentPosition].classList.contains(truckClass) || cells[bearCurrentPosition].classList.contains(busClass)) {
      lives -= 1
      livesLeft.innerHTML = lives
      // livesLeft.classList.add('animate__flash')
      if (lives === 0) {
        gameOver()
      } else {
        cells[bearCurrentPosition].classList.replace(bearClass, beenHitClass)
        setTimeout(() => {
          cells[bearCurrentPosition].classList.remove(beenHitClass)
        }, 200)
        backToStart()
      }  
    }
  }
  

  // Home safe
  function homeSafe(event) {
    if (bearCurrentPosition === 1 || bearCurrentPosition === 3 || bearCurrentPosition === 5 || bearCurrentPosition === 7) {
      score += 150
      totalScore.innerHTML = score
      cells[bearCurrentPosition].classList.replace(caveClass, homeBearClass)
    } 
    if (bearCurrentPosition === 1 || bearCurrentPosition === 3 || bearCurrentPosition === 5 || bearCurrentPosition === 7){
      backToStart()
    }
    youWin()
  }


  // Once all 4 homes made to
  function youWin() {
    if (cells[1].classList.contains(homeBearClass) && cells[3].classList.contains(homeBearClass) && cells[5].classList.contains(homeBearClass) && cells[7].classList.contains(homeBearClass) && timeRemaining > 0) {
      gameOver()
      setTimeout(() => {
        refresh()
      }, 200)
      
    } 
  }

  function refresh() {
    cells[1].classList.replace(homeBearClass, caveClass) 
    cells[3].classList.replace(homeBearClass, caveClass) 
    cells[5].classList.replace(homeBearClass, caveClass) 
    cells[7].classList.replace(homeBearClass, caveClass) 
    backToStart()
    livesLeft.innerHTML = 3
    timerScreen.innerHTML = 30
    timeRemaining = 30
    score = 0
    totalScore.innerHTML = 0
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
    timerIDCar = setInterval(() => {
      removeCar(carCurrentPosition)

      if (carCurrentPosition === 71 ) {
        carCurrentPosition -= 8
      } else {
        carCurrentPosition++
      }
      addCar(carCurrentPosition)
      if (carCurrentPosition === bearCurrentPosition) {
        lives -= 1
        livesLeft.innerHTML = lives
        if (lives === 0) {
          gameOver()
        } else {
          cells[carCurrentPosition].classList.replace(carClass, beenHitClass)
          setTimeout(() => {
            cells[carCurrentPosition].classList.remove(beenHitClass)
          }, 200)
          backToStart()
        }
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
    timerIDTruck = setInterval(() => {
      removeTruck(truckCurrentPosition)

      if (truckCurrentPosition === 62) {
        truckCurrentPosition -= 8
      } else {
        truckCurrentPosition++
      }
      addTruck(truckCurrentPosition)
      if (truckCurrentPosition === bearCurrentPosition) {
        lives -= 1
        livesLeft.innerHTML = lives
        if (lives === 0) {
          gameOver()
        } else {
          cells[truckCurrentPosition].classList.replace(truckClass, beenHitClass)
          setTimeout(() => {
            cells[truckCurrentPosition].classList.remove(beenHitClass)
          }, 200)
          backToStart()
        }
      }
    }, 250)
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
    timerIDBus = setInterval(() => {
      removeBus(busCurrentPosition)

      if (busCurrentPosition === 45) {
        busCurrentPosition += 8
      } else {
        busCurrentPosition--
      }
      addBus(busCurrentPosition)
      if (busCurrentPosition === bearCurrentPosition) {
        lives -= 1
        livesLeft.innerHTML = lives
        if (lives === 0) {
          gameOver()
        } else {
          cells[busCurrentPosition].classList.replace(busClass, beenHitClass)
          setTimeout(() => {
            cells[busCurrentPosition].classList.remove(beenHitClass)
          }, 200)
          backToStart()
        }
      }
    }, 290)
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
    timerIDLog1 = setInterval(() => {
      removeLog(logCurrentPosition)

      if (logCurrentPosition === 27 ) {
        logCurrentPosition += 8
      } else {
        logCurrentPosition--
      }
      addLog(logCurrentPosition)

      if (logCurrentPosition  === bearCurrentPosition) {
        lives -= 1
        livesLeft.innerHTML = lives
        if (lives === 0) {
          gameOver()
        } else {
          cells[logCurrentPosition].classList.replace(logClass, beenHitClass)
          setTimeout(() => {
            cells[logCurrentPosition].classList.remove(beenHitClass)
          }, 200)
          backToStart()
        }
      }
    }, 210)
  }

  // * Second move log function
  function moveLog2() {
    timerIDLog2 = setInterval(() => {
      removeLog(logCurrentPosition2)

      if (logCurrentPosition2 === 9) {
        logCurrentPosition2 += 8
      } else {
        logCurrentPosition2--
      }
      addLog(logCurrentPosition2)
      if (logCurrentPosition2 === bearCurrentPosition) {
        lives -= 1
        livesLeft.innerHTML = lives
        if (lives === 0) {
          gameOver()
        } else {
          cells[logCurrentPosition2].classList.replace(logClass, beenHitClass)
          setTimeout(() => {
            cells[logCurrentPosition2].classList.remove(beenHitClass)
          }, 200)
          backToStart()
        }
      }
    }, 275)
  }

  //* Third move log function
  function moveLog3() {
    timerIDLog3 = setInterval(() => {
      removeLog(logCurrentPosition3)

      if (logCurrentPosition3 === 26) {
        logCurrentPosition3 -= 8
      } else {
        logCurrentPosition3++
      }
      addLog(logCurrentPosition3)
      if (logCurrentPosition3 === bearCurrentPosition) {
        lives -= 1
        livesLeft.innerHTML = lives
        if (lives === 0) {
          gameOver()
        } else {
          cells[logCurrentPosition3].classList.replace(logClass, beenHitClass)
          setTimeout(() => {
            cells[logCurrentPosition3].classList.remove(beenHitClass)
          }, 200)
          backToStart()
        }
      }
    }, 250)
  }



  // * Main game timer, linked to start button


  function gameTimer() {
    timerIDGame = setInterval(() => {
      timeRemaining--
      if (timeRemaining < 0) {
        clearInterval(timerIDGame)
        timerScreen.innerHTML = 'GAME OVER!'
        timerScreen.style.fontSize = '35px'  
        
        
        timerScreen.classList.add('animate__flash')
        gameOver()
      } else {
        timerScreen.innerHTML = timeRemaining
      }
    }, 1000)
  }


  // * Start game 
  function startGame() {
    gameTimer()
    audio.src = '../assets/AMBForst_Forest (ID 0100)_BSB.wav'
    audio.play()
    // carAudioTimer()
    moveCar()
    moveTruck()
    moveBus()
    moveLog()
    moveLog2()
    moveLog3()
    youWin()
  }

  // * Game Over function
  function gameOver() {
    clearInterval(timerIDGame)
    clearInterval(timerIDCar)
    removeCar(carCurrentPosition)
    clearInterval(timerIDTruck)
    removeTruck(truckCurrentPosition)
    clearInterval(timerIDBus)
    removeBus(busCurrentPosition)
    clearInterval(timerIDLog1)
    removeLog(logCurrentPosition)
    clearInterval(timerIDLog3)
    removeLog(logCurrentPosition2)
    clearInterval(timerIDLog2)
    removeLog(logCurrentPosition3)
    refresh()
    audio.pause()
  }

  function closeOverlay(){
    introScreen.style.display = 'none'
  }

  // * EVENT LISTENERS

  document.addEventListener('keyup', moveBear)

  

  createGrid(bearStartPosition)

  button.addEventListener('click', startGame)

  document.addEventListener('keyup', homeSafe)

  land()
  home()
  waterAndRoad()

  document.addEventListener('click', closeOverlay)
  

}

window.addEventListener('DOMContentLoaded', init)