//Board

let Blocksize = 25;
let rows = 20;
let cols = 20;
let Board;
let context;

//snake

let snakeX = Blocksize * 5;
let snakeY = Blocksize * 5;

let snakeSpeedX = 0;
let snakeSpeedY = 0;

let snakeBody = [];

//food

let foodX;
let foodY;

//gameover
let GameOver = false;

window.onload = function() {
    Board = document.getElementById('Board');
    Board.height = rows * Blocksize;
    Board.width = cols * Blocksize;
    context = Board.getContext("2d");


    PlaceFood();
    document.addEventListener('keyup', snakeDirection);
    //update();
    setInterval(update, 1000/10);
}

function update(){
    if (GameOver){
        return;
    }


    context.fillStyle="black";
    context.fillRect(0, 0, Board.width, Board.height);

    context.fillStyle="red";
    context.fillRect(foodX, foodY, Blocksize, Blocksize);

    if (snakeX == foodX && snakeY == foodY){
        
        snakeBody.push([foodX,foodY])
        PlaceFood();
    }
    for ( let i = snakeBody.length - 1;i > 0; i--){
         snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }




    context.fillStyle="green";
    snakeX += snakeSpeedX * Blocksize;
    snakeY += snakeSpeedY * Blocksize;
    context.fillRect(snakeX, snakeY, Blocksize, Blocksize);
    for (i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], Blocksize, Blocksize);

    }

    //gameover condition
    if (snakeX < 0 || snakeX > cols*Blocksize-1 || snakeY < 0 || snakeY > row*Blocksize- 1){
        GameOver = true;
        alert('Game Over');
    }
    for (let i = 0;i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            GameOver = true;
            alert('Game Over');
        }
    }


}
function snakeDirection(press){
    if (press.code == 'ArrowUp' && snakeSpeedY != 1) {
        snakeSpeedX = 0;
        snakeSpeedY = -1;
    } else if (press.code == 'ArrowDown' && snakeSpeedY != -1){
        snakeSpeedX = 0;
        snakeSpeedY = 1;
    } else if (press.code == 'ArrowLeft' && snakeSpeedX != 1){
        snakeSpeedX = -1;
        snakeSpeedY = 0;
    } else if (press.code == 'ArrowRight' && snakeSpeedX != -1){
        snakeSpeedX = 1;
        snakeSpeedY = 0;
    }
}


function PlaceFood() {
    foodX = Math.floor(Math.random() * cols) * Blocksize;
    foodY = Math.floor(Math.random() * rows) * Blocksize;
}