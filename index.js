// //This is a useful eventListener to determine what key is being pressed on the keyboard and what the keycode is.
// // Add event listener on keydown
// document.addEventListener('keydown', (event) => {
//   var name = event.key;
//   var code = event.code
//   // Alert the key name and key code on keydown
//   console.log(`Key pressed ${name} \n Key code value: ${code}`);
// }, false);

//This helps me determine which ouse button is being clicked
// document.addEventListener('mousedown', (click) => {
//   var clickName = click.button


//   console.log(`Key pressed ${clickName} \n`);
// }, false);

let paddle = document.querySelector('.paddle')
let paddle_X = window.getComputedStyle(paddle, null).getPropertyValue("left")
let paddle_Y = window.getComputedStyle(paddle, null).getPropertyValue("top")
let paddle_Rect = paddle.getBoundingClientRect();
let paddle_Coord = parseInt(paddle_X)
let paddle_Coord_Y = parseInt(paddle_Y)
let ball = document.querySelector('.ball');
let ball_coord = ball.getBoundingClientRect();
let ball_Y = window.getComputedStyle(ball, null).getPropertyValue("top");
let ball_X = window.getComputedStyle(ball, null).getPropertyValue("left");
let gameboard = document.querySelector('.gameboard');
let gameboard_pos = gameboard.getBoundingClientRect();
let bounds_Yaxis = window.getComputedStyle(gameboard, null).getPropertyValue("border-width")
let inProgress = false;
let y_coord = parseInt(ball_Y)
let x_coord = parseInt(ball_X)
let speed = 5
let ballspeed = .3
let initialPaddleSpeed = .5
let paddlespeed = initialPaddleSpeed
let points = document.querySelector('.points')
let y_dir = Math.round(Math.random()) ? 1 : -1
let x_dir = Math.random()
let paddleDir = 0;
let id = null;
let hitBorder = null;
let paddleID = null;
let paddleID2 = null;
let keypressed = false;
let timer = 0;
let timer_id = null;
let prompt = document.querySelector('.gameprompt');
let gameprompt_ID = null;
let timeMilliseconds = document.querySelector('.milliseconds')
let timeSeconds = document.querySelector('.seconds')
let milliSeconds = 0;
let seconds = 0;
let gameOver = false;

// console.log("Paddle X Position: " + paddle_Coord)
// console.log("Paddle Y Position: " + paddle_Coord_Y)
// console.log("Ball Y Position: " + y_coord)
// console.log("Ball X Position: " + x_coord)
// console.log(gameboard_pos)



document.addEventListener("keyup", startGame)

gamePrompt();



function startGame(event) {

  //if enter key is pressed start the game
  if (event.code === "Enter" && inProgress == false) {
    inProgress = true;
    timer_id = setInterval(timerFunc, 100)
    clearInterval(gameprompt_ID)
    prompt.style.display = "none";
    id = setInterval(frame, speed);
    console.log("start game")
  }

  document.addEventListener("keyup", (event) => {
    if (event.code === "KeyR") {
      location.reload();
    }
  })

  document.addEventListener("keyup", function (event) {
    if (event.code === "ArrowLeft" && gameOver == false) {
      clearInterval(paddleID)
      clearInterval(paddleID2)
      paddleID = null
      paddleDir = -1
      paddlespeed = initialPaddleSpeed
      if (paddleID == null)
        paddleID = setInterval(paddleMovement, speed);
    }
    else if (event.code === "ArrowRight" && gameOver == false) {
      clearInterval(paddleID2)
      clearInterval(paddleID)
      paddleID = null
      paddleDir = 1
      paddlespeed = initialPaddleSpeed
      if (paddleID == null)
        paddleID2 = setInterval(paddleMovement, speed)
    }
  })


  function frame() {
    console.log("I'm in here")

    document.addEventListener("keydown", function (event) {
      if (event.code === "KeyR") {
        clearInterval(id)
        clearInterval(timer_id)
        timeSeconds.innerHTML = 0;
        timeMilliseconds.innerHTML = 0;
        inProgress = false;
        y_coord = parseInt(ball_Y)
        x_coord = parseInt(ball_X)
        ball.style.top = parseInt(y_coord) + "px";
        ball.style.left = parseInt(x_coord) + "px";
        gamePrompt();
        console.log("Reset")
      }
    })

    if (y_coord < gameboard_pos.height && y_coord > 0 && x_coord < gameboard_pos.width && x_coord > 0) {
      y_coord = y_coord + 1 * y_dir * ballspeed;
      x_coord = x_coord + 1 * x_dir * ballspeed;
    }
    if (y_coord < 0 && x_coord < 0) {
      y_dir *= -1;
      x_dir *= -1;
      points.innerHTML = parseInt(points.innerHTML) + 1;
      gameboard.style.borderTopColor = "red"
      hitBorder = setInterval(topBorderHit, 200)
    }
    if (y_coord + 10 > gameboard_pos.height) {
      clearInterval(id)
      clearInterval(paddleID)
      clearInterval(paddleID2)
      gameboard.style.borderBottomColor = "red"
      hitBorder = setInterval(topBorderHit, 200)
      gameOver = true;
      gamePrompt();
      y_dir *= -1;
    }
    if (x_coord + 10 > gameboard_pos.width) {
      x_dir *= -1;
    }
    if (x_coord - 3 < 0) {
      x_dir *= -1;

    }
    if (y_coord - 3 < 0) {
      y_dir *= -1;
      points.innerHTML = parseInt(points.innerHTML) + 1;
      gameboard.style.borderTopColor = "red"
      hitBorder = setInterval(topBorderHit, 200)
    }

    if (y_coord - 10 < paddle_Coord_Y + 5 && y_coord + 10 > paddle_Coord_Y - 5 && x_coord + 5 < paddle_Coord + 25 && x_coord - 5 > paddle_Coord - 25) {
      y_dir *= -1
    }
    y_coord = y_coord + 1 * y_dir * ballspeed;
    x_coord = x_coord + 1 * x_dir * ballspeed;
    ball.style.top = y_coord + "px";
    ball.style.left = x_coord + "px";
  }



}

function timerFunc() {
  milliSeconds++
  if (milliSeconds == 10) {
    milliSeconds = 0
    seconds++
    timeSeconds.innerHTML = seconds
    if (parseInt(timeSeconds.innerHTML) % 5 == 0) {
      ballspeed = ballspeed + .2
      initialPaddleSpeed = initialPaddleSpeed + .3
    }
  }
}


function paddleMovement() {

  if (paddle_Coord + 25 > gameboard_pos.width - 4) {
    console.log("Stuck TOP")
    paddlespeed = 0;
    paddle_Coord = 370;
    clearInterval(paddleID2)
  }
  if (paddle_Coord - 25 < 0 && paddlespeed > 0) {
    paddlespeed = 0;
    paddle_Coord = 30;
    console.log("Stuck bottom")
    clearInterval(paddleID)
  }
  paddle_Coord = paddle_Coord + 1 * paddleDir * paddlespeed;
  paddle.style.left = paddle_Coord + 'px'




}

function getRandomInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomAngle(min, max) {
  return (Math.random() * (max - min) + min) * (Math.round(Math.random()) ? 1 : -1);
}

function topBorderHit() {
  gameboard.style.borderTopColor = "green"
  clearInterval(hitBorder)
}

function gamePrompt() {
  gameprompt_ID = setInterval(showPrompt, 500)
}

function showPrompt() {

  if (prompt.style.display === "none") {
    prompt.style.display = "block";
  } else {
    prompt.style.display = "none";
  }

  if (gameOver == true) {
    prompt.innerHTML = "Press 'R' to try again?"
  }

}

