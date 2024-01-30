let canvas;
let context;
//let sound = document.querySelector("#boing");
var btnStart = document.getElementById('btn_start');
var btnStop = document.getElementById('btn_stop');
var x_speed = document.getElementById('x_speed');
var y_speed = document.getElementById('y_speed');

function start() {
    directionX = parseInt(x_speed.value);
    directionY = parseInt(y_speed.value);
    btnStop.disabled = false;
    btnStart.disabled = true;
}

function stopBall() {
    directionX = 0;
    directionY = 0;
    btnStop.disabled = true;
    btnStart.disabled = false;
}

canvas = document.getElementById('2d-animation-canvas');
context = canvas.getContext('2d');

function draw(x, y) {
    context.fillStyle = "#02A9EA";
    context.beginPath();
    context.arc(x,y,10,0,Math.PI * 2,true);
    context.fill();
  }

function clearCanvas() {
    canvas.width = canvas.width;
  } 

var ballX = 300;
var ballY = 225;
var directionX = 0;
var directionY = 0;

draw(ballX, ballY);

setInterval(function(){
  if (ballX > 592 || ballX < 0){
    directionX *= -1;
    //sound.play();
  }

  if (ballY < 0 || ballY > 542){
    directionY *= -1;
    //sound.play();
  }

  ballX += directionX;
  ballY += directionY;
  clearCanvas();
  draw(ballX, ballY);

}, 35);
