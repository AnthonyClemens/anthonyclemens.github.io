//Javascript Snake by Anthony Clemens 2024

//Display variables
var canvas;
var context;
var scoreText;
var canvasW;
var canvasH;
var head;
var rot;

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
var score;
var snakeLength;


function main(){
    init();
    drawGame();
    snakeXs[0]=16;
    snakeYs[0]=16;
    drawGame();
    console.log(canvasW, canvasH,snakeXs[0],snakeYs[0],movement);
}

function init(){
    canvas = document.getElementById("snakeCanvas");
    context = canvas.getContext("2d");
    if(document.getElementById("scoreDiv")==null){
        var scoreDiv = document.createElement("div");
        scoreDiv.setAttribute("id","scoreDiv");
        scoreText =  document.createTextNode("Score: 0");
        scoreDiv.appendChild(scoreText);
        canvas.after(scoreDiv);
    }else{
        scoreText = document.getElementById("scoreDiv");
    }
    canvasW = canvas.clientWidth;
    canvasH = canvas.clientHeight;
    
    try{
        snakeXs = new Array(((canvasW*canvasH)/(pixelSize*pixelSize)));
        snakeYs = new Array(((canvasW*canvasH)/(pixelSize*pixelSize)));
    }catch{
        console.error("Canvas width and height must be a multiple of "+pixelSize);
        return;
    }

    snakeXs[0]=canvasW/2;
    snakeYs[0]=canvasH/2;

    head = new Image();
    head.src = 'js/head.png';

    snakeLength = 1;
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
    
}

function drawGame(){
    context.clearRect(0,0,canvasW,canvasH);
    
    for(var i = 0; i < snakeLength; i++){
        if(i==0){
            context.save();
            context.translate(snakeXs[0], snakeYs[0]);
            if(movement.none||movement.up){
                rot = 0;
            }else if(movement.down){
                rot = Math.PI;
            }else if(movement.left){
                rot = (3*Math.PI)/2
            }else{
                rot = Math.PI/2;
            }
            context.rotate(rot);
            context.drawImage(head,-(pixelSize/2),-(pixelSize/2),pixelSize,pixelSize);
            context.rotate(-rot);
            context.translate(-snakeXs[0],-snakeYs[0]);
            context.stroke();
            context.restore();
            console.log(rot);
        }
    }

    context.stroke();
}