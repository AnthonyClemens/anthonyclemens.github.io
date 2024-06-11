//Javascript Snake by Anthony Clemens 2024

//Display variables
var canvas;
var context;
var scoreText;
var canvasW;
var canvasH;
var totalChunks;

var head;
var body;
var tail;
var bg;
var apple;

//Movement Enum
const movement = {
    up: false,
    down: false,
    left: false,
    right: false,
    none: true
};

//Game Constants
const pixelSize = 32;
const snakeSpeed = 10;
const speedMultiplier = 1.2;

//Game Variables
var snakeXs;
var snakeYs;
var appleX;
var appleY;
var score = 0;
var snakeLength = 2;
var snakeRots;


function main(){
    init();
    drawGame();
    setScore(score);
    console.log(canvasW, canvasH,snakeXs[1],snakeYs[1],movement,snakeLength);
}

function init(){
    canvas = document.getElementById("snakeCanvas");
    context = canvas.getContext("2d");
    //Setup the score
    if(document.getElementById("scoreDiv")==null){
        var scoreDiv = document.createElement("div");
        scoreDiv.setAttribute("id","scoreDiv");
        scoreText =  document.createTextNode("Score: 0");
        scoreDiv.appendChild(scoreText);
        canvas.after(scoreDiv);
    }else{
        scoreText = document.getElementById("scoreDiv");
    }
    //Get data from the canvas
    canvasW = canvas.clientWidth;
    canvasH = canvas.clientHeight;
    totalChunks = (canvasW*canvasH)/(pixelSize*pixelSize);
    //Set the Array Lengths for canvas calculated sizes
    try{
        snakeXs = new Array(totalChunks);
        snakeYs = new Array(totalChunks);
        snakeRots = new Array(totalChunks);
    }catch{
        console.error("Canvas width and height must be a multiple of "+pixelSize);
        return;
    }
    //Set default snake parameters
    snakeXs[0]=canvasW/2;
    snakeYs[0]=canvasH/2;
    snakeXs[1]=(canvasW/2);
    snakeYs[1]=(canvasH/2)+pixelSize;
    snakeRots[0]=0;
    snakeRots[1]=0;
    //Load assets
    head = new Image();
    head.src = 'js/head.png';

    body = new Image();
    body.src = "js/body.png";

    tail = new Image();
    tail.src = "js/tail.png";

    bg = new Image();
    bg.src = "js/grass.png";

    apple = new Image();
    apple.src = "js/apple.png";
}

function setMovement(direction){
    //Reset all to false
    for (let i in movement){
        movement[i] = false;
    }
    //Set direction with default of none
    if(movement.hasOwnProperty(direction)){
        movement[direction] = true;
    }else{
        movement.none = true;
    }
}

function drawSnake(){
    for(var i = 0; i < snakeLength; i++){
        context.save();
        context.translate(snakeXs[i], snakeYs[i]);
        var rot = snakeRots[i];
        context.rotate(rot);
        if(i===0){
            context.drawImage(head,-(pixelSize/2),-(pixelSize/2),pixelSize,pixelSize);
        }else if(i===snakeLength-1){
            context.drawImage(tail,-(pixelSize/2),-(pixelSize/2),pixelSize,pixelSize);
        }else{
            context.drawImage(body,-(pixelSize/2),-(pixelSize/2),pixelSize,pixelSize);
        }
        context.rotate(-rot);
        context.translate(-snakeXs[i],-snakeYs[i]);
        context.stroke();
        context.restore();
        console.log(i);
    }
    context.stroke();
}


function setScore(score){
    document.getElementById("scoreDiv").textContent="Score: "+score;
}

function drawBg(){
    var pattern = context.createPattern(bg, 'repeat');
    context.rect(0,0,canvasW,canvasH);
    context.fillStyle=pattern;
    context.fill();
}

function drawApple(){
    context.drawImage(apple, 0, 0,pixelSize,pixelSize);
}

function makeApple(){

}

function simulate(){
    var oldX = snakeXs[1];
    var oldY = snakeYs[1];
    var oldRot = snakeRots[1];
    var old2X, old2Y, old2Rot;
    snakeXs[1] = snakeXs[0];
    snakeYs[1] = snakeYs[0];
    snakeRots[1] = snakeRots[0];
    for(var i = 2; i < snakeLength; i++){
        old2X = snakeXs[i];
        old2Y = snakeYs[i];
        old2Rot = snakeRots[i];
        snakeXs[i] = oldX;
        snakeYs[i] = oldY;
        snakeRots[i] = oldRot;
        oldX = old2X;
        oldY = old2Y;
        oldRot = old2Rot;
    }
    var rotate;
    if(movement.none||movement.up){
        snakeRots[0] = 0;
        if(!movement.none){
            snakeYs[0] = snakeYs[0]-pixelSize;
        }
    }else if(movement.down){
        snakeRots[0] = Math.PI;
    }else if(movement.left){
        snakeRots[0] = (3*Math.PI)/2
    }else{
        snakeRots[0] = Math.PI/2;
    }
}

check

function drawGame(){
    context.clearRect(0,0,canvasW,canvasH);
    drawBg();
    drawSnake();
    drawApple();
}

onkeydown = function(e) {

    var key = e.which;

    if ((key == 65) && (!movement.right)) {
        setMovement('left');
    }

    if ((key == 68) && (!movement.left)) {
        setMovement('right');
    }

    if ((key == 87) && (!movement.down)) {
        setMovement('up');
    }

    if ((key == 83) && (!movement.up)) {
        setMovement('down');
    }
};