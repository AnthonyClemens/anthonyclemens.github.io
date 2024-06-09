//Javascript Snake by Anthony Clemens 2024

//Display variables
var canvas;
var context;
var canvasW;
var canvasH;

//Movement Enum
const movement = {
    up: false,
    down: false,
    left: false,
    right: false,
    none: true
};

//Game Variables
var snakeSpeed = 10;
var speedMultiplier = 1.2;


function main(){
    init();
    console.log(canvasW, canvasH);
}

function init(){
    canvas = document.getElementById("snakeCanvas");
    context = canvas.getContext("2d");
    canvasW = canvas.clientWidth;
    canvasH = canvas.clientHeight;
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