# SEI Project 1: Frogger Re-imagined

## Table of Contents
Overview<br/>
[Brief & Timeframe](#brief) <br/>
[Link to Project](#project) <br/>
[Technologies used](#technologies-used) <br/>
[Development (screenshots & featured code)](#development) <br/>
[Known bugs](#bugs)<br/>
[Wins and Challenges](#wins)<br/>
[Future improvements](#improvements)<br/>
[Key learnings](#learnings)<br/>

## Overview
The aim of the game was to build a browser-based game in one week, without HTML Canvas. This was my first ever web development project, as well as being the first on General Assembly’s Software Engineering Immersive course, and was built solo. 
<br/>
<br/>

![frogger-home](https://github.com/hannahtinacci/sei-project-one/blob/main/Frogger%201.png)

## <a name="brief"></a>Brief  
Frogger is a classic arcade game where a family of frogs need to be guided across a road and a river to make it home safely, within the given time frame, all the while avoiding moving obstacles. The brief stipulated that:
the game should be playable for one player
the obstacles should be auto generated


## Timeframe
1 week

## <a name="project"></a> Link to deployed project 
https://hannahtinacci.github.io/sei-project-one/

## Controls 
* Click the Play button above the grid
* Use the left ( &#8592; ) and right ( &#8594; ) arrow keys to move bear left and right, respectively.
* Use the up ( &#8593; ) and down ( &#8595; ) arrow keys to move bear forward and backward, respectively.
* Once all bears are home the game is finished and you can press Restart at the top of the screen.


## <a name="technologies-used"></a>Technologies used
HTML5
CSS3
JavaScript (ES6)
Git/GitHub

## <a name="development"></a>Development 💻

### Planning
Initially, I had planned to go for a different game but changed my mind after speaking with the instructional team. Their faith in my ability to carry out this project gave me hope and I spent the first day pseudocoding the main parts of the game. Collision detection and grid boundaries were two important factors to this game so I dedicated a fair amount of time to those, as well as auto-generating the obstacles. 

### Process
I was under strict instructions to not use HTML Canvas and so I created the grid using a loop to create a set of divs within a larger container. 

```
const grid = document.querySelector('.grid')
 const width = 9
 const cellCount = width * width
 const cells = []
 
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
```

The set up of the game was always to be the same: that is, with bear at his start position in the centre of the lowest row and a strip of land halfway up the grid that was a safe area, as well as the four caves for home at the top most row of the grid. These three things would be called on creation of the grid every time a new game was started, as seen in the above code snippet and below.

```
function home() {
   const homeRow = cells.slice(0, 9)
   const homeCave = homeRow.filter((cell, index) => {
     return index % 2 !== 0
   })
   homeCave.forEach(cell => {
     cell.classList.add(caveClass)
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
```

Adding bear and getting him to move were the next two things to consider. The movement of bear also brought with it the idea of grid boundaries. I tackled that using classes, event key codes and a little bit of maths:

```
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
```

Due to the fact that there were four caves to get bear home to safely before the game could be won, this brought with it the need to show this to the user and bring bear back to the start position from various points on the grid. This was achieved with a simple JS Math object.

Whilst bear could not go through the boundary walls, the moving obstacles had to - but only on their rows. I used some more maths logic to help with this and wrapped the whole function in a timer:

 ```
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
   }, 190)
 }
```

Collision detection was the next big thing on my list to counter and it also had to be obvious to the user that they’d been hit because they only had three lives per game. This meant I wanted to have a visual representation by adding another class to the cell:

```
function detectCollision() {
   if (cells[bearCurrentPosition].classList.contains(carClass) || cells[bearCurrentPosition].classList.contains(truckClass) || cells[bearCurrentPosition].classList.contains(busClass)) {
     lives -= 1
     livesLeft.innerHTML = lives
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
```

It wouldn’t be a game without some winning logic. In order to win, the user had to get bear home to all four caves at the top most row of the grid, within the timeframe of 30 seconds and without being hit by any moving obstacles more than twice. This was achieved with:

```
function youWin() {
   if (cells[1].classList.contains(homeBearClass) && cells[3].classList.contains(homeBearClass) && cells[5].classList.contains(homeBearClass) && cells[7].classList.contains(homeBearClass) && timeRemaining > 0) {
     gameOver()
     setTimeout(() => {
       refresh()
     }, 200)
    
   }
 }
```

## <a name="bugs"></a>Known bugs
Collision detection happens both when bear moves into a moving obstacle and when a moving obstacle hits bear from the side. The latter results in the ‘ouch!’ sign not being removed, even though it is removed in the former scenario. Given more time I’m confident I would have resolved it.

## <a name="wins"></a>Wins and Challenges

### Challenges
As I had only been on the course for about three weeks and this was the most JavaScript I’d ever written, there were many challenges! Once I’d figured out boundaries of the grid that bear couldn’t go through, collision detection was the next tricky part - and a big part of the game at that. 


### Wins 🎉
It was noted in the brief that there would be a number of timers to manage across the whole game, which can easily get out of hand. I’m happy to say that I now feel a lot more comfortable using timers! And overall, my understanding of JS fundamentals such as DOM events and query selectors were solidified.


## <a name="improvements"></a>Future improvements 
* In the original arcade game the frog can hitch a ride on the logs to get across the river, I would implement that after changing the set up of my obstacles into classes
* Add a high score board with local storage


## <a name="learnings"></a> Key learnings ✨
This was a great first project to put all of the learnings from the previous three weeks into practice, and, I realised I would have done things quite differently if I did it again. I now know the importance of fully pseudocoding a project of this size before starting. Another key learning point from this project is knowing when to step back and move on to another area if I was stuck on a piece of code.


