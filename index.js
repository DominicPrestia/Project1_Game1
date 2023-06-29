// //This is a useful eventListener to determine what key is being pressed on the keyboard and what the keycode is.
// // Add event listener on keydown
// document.addEventListener('keydown', (event) => {
//   var name = event.key;
//   var code = event.code
//   // Alert the key name and key code on keydown
//   console.log(`Key pressed ${name} \n Key code value: ${code}`);
// }, false);

//This helps me determine which ouse button is being clicked
document.addEventListener('mousedown', (click) => {
  var clickName = click.button


  console.log(`Key pressed ${clickName} \n`);
}, false);

let paddle = document.querySelector('.paddle')
let paddle_X = window.getComputedStyle(paddle,null).getPropertyValue("left")
let paddle_Coord = parseInt(paddle_X)
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
let speed = 50;
let points = document.querySelector('.points')
let y_dir = Math.round(Math.random()) ? 1 : -1
let x_dir = getRandomAngle(.1, 2)
let paddleDir;
let pressed = true;
let id = null;
let hitBorder = null;
let paddleID = null;
console.log("Ball Y: " + ball_Y)
console.log("Ball X: " + ball_X)
console.log("Paddle X: " + paddle_Coord)

function pad2(event){
  return event.code
}

document.addEventListener("keyup", startGame)
document.addEventListener("keydown",paddleController)



function paddleController(event){

  if(event.code == "ArrowLeft"){
    paddleDir = -1;
    paddleMovement();
  }
  if(event.code == "ArrowRight"){
    paddleDir = 1;
    paddleMovement();
  }
}

function paddleMovement(){
  paddle_Coord = paddle_Coord + 20 * paddleDir;
  paddle.style.left = paddle_Coord + 'px'
}

function startGame(event) {

  //if enter key is pressed start the game
  if (event.code === "Enter" && inProgress == false) {
    inProgress = true;
    id = setInterval(frame, speed);
    console.log("start game")
  }

  function frame() {

    document.addEventListener("keydown", function (event) {
      if (event.code === "KeyR") {
        clearInterval(id)
        inProgress = false;
        y_coord = parseInt(ball_Y)
        x_coord = parseInt(ball_X)
        ball.style.top = parseInt(y_coord) + "px";
        ball.style.left = parseInt(x_coord) + "px";
        console.log("Reset")
      }
    })

    if (y_coord < gameboard_pos.height && y_coord > 0 && x_coord < gameboard_pos.width && x_coord > 0) {
      y_coord = y_coord + 1 * y_dir;
      x_coord = x_coord + 1 * x_dir;
    }
    if (y_coord > gameboard_pos.height && x_coord > gameboard_pos.width) {
      y_dir *= -1;
      x_dir *= -1;
    }
    if (y_coord < 0 && x_coord < 0) {
      y_dir *= -1;
      x_dir *= -1;
      points.innerHTML = parseInt(points.innerHTML) + 1;
      gameboard.style.borderTopColor = "red"
      hitBorder = setInterval(topBorderHit,200)
    }
    if (y_coord > gameboard_pos.height) {
      y_dir *= -1;
    }
    if (x_coord > gameboard_pos.width) {
      x_dir *= -1;
    }
    if (x_coord < 0) {
      x_dir *= -1;

    }
    if (y_coord < 0){
      y_dir *= -1;
      points.innerHTML = parseInt(points.innerHTML) + 1;
      gameboard.style.borderTopColor = "red"
      hitBorder = setInterval(topBorderHit,200)
    }

    y_coord = y_coord + 1 * y_dir;
    x_coord = x_coord + 1 * x_dir;
    ball.style.top = parseInt(y_coord) + "px";
    ball.style.left = parseInt(x_coord) + "px";
  }



}


function getRandomInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomAngle(min, max) {
  return (Math.random() * (max - min) + min) * (Math.round(Math.random()) ? 1 : -1);
}

function topBorderHit(){
    gameboard.style.borderTopColor = "green"
    clearInterval(hitBorder)
}

