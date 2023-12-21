const gameboard = document.querySelector("#gameboard");
const context = gameboard.getContext("2d");
const scoretext = document.querySelector("#scoretext");
const resetbtn = document.querySelector("#resetbtn");
const width = gameboard.width;
const height = gameboard.height;
const boardbg = "darkgreen";
const snakecolor = "grey";
const snakeborder = "black";
const foodcolor = "red";
const unitsize = 25;
let running = false;
let xvelocity = unitsize;
let yvelocity = 0;
let foodx;
let foody;
let score = 0;
let snake = [
    {x:unitsize*4, y:0},
    {x:unitsize*3, y:0},
    {x:unitsize*2, y:0},
    {x:unitsize*1, y:0},
    {x:0, y:0}];

window.addEventListener("keydown", changedirection);
resetbtn.addEventListener("click", resetgame);

gamestart();


function gamestart(){
    running=true;
    scoretext.textContent = score;
    creatfood();
    drawfood();
    nexttick();
};
function nexttick(){
    if (running){
        setTimeout(()=> {
            clearboard();
            drawfood();
            movesnake();
            drawsnake();
            checkgameover();
            nexttick();}, 75);
    }
    else{
        displaygameover();
    }
};
function creatfood(){
    function randomfood(min, max){
        const randnum = Math.round((Math.random()*(max-min)+min)/unitsize)*unitsize;
        return randnum;
    }
    foodx = randomfood(0, width - unitsize);
    foody = randomfood(0, height - unitsize);
};
function drawfood(){
    context.fillStyle = foodcolor;
    context.fillRect(foodx, foody, unitsize, unitsize);
};
function movesnake(){
    const head = {x:snake[0].x + xvelocity,
                    y:snake[0].y + yvelocity};
    snake.unshift(head);
    if(snake[0].x == foodx && snake[0].y == foody){
        score+=1;
        scoretext.textContent = score;
        creatfood();
    }
    else{
        snake.pop();
    }
};
function drawsnake(){
    context.fillStyle = snakecolor;
    context.strokeStyle = snakeborder;
    snake.forEach(snakepart => {
        context.fillRect(snakepart.x, snakepart.y, unitsize, unitsize);
        context.strokeRect(snakepart.x, snakepart.y, unitsize, unitsize);
    });
};
function clearboard(){
    context.fillStyle = boardbg;
    context.fillRect(0,0,width, height);
};
function changedirection(key){
    const keypress = key.keyCode;
    const left = 37;
    const right = 39;
    const up = 38;
    const down = 40;
    const goingup = (yvelocity == -unitsize);
    const goingdown = (yvelocity == unitsize);
    const goingright = (xvelocity == unitsize);
    const goingleft = (xvelocity == -unitsize);

    switch(true){
        case(keypress == left && !goingright):
            xvelocity = -unitsize;
            yvelocity = 0;
            break;
        case(keypress == right && !goingleft):
            xvelocity = unitsize;
            yvelocity = 0;
            break;
        case(keypress == up && !goingdown):
            xvelocity = 0;
            yvelocity = -unitsize;
            break;
        case(keypress == down && !goingup):
            xvelocity = 0;
            yvelocity = unitsize;
            break;
    }
};
function checkgameover(){
    switch(true){
        case(snake[0].x < 0):
            running=false;
            break;
        case(snake[0].x >= width):
            running=false;
            break;
        case(snake[0].y < 0):
            running=false;
            break;
        case(snake[0].y >= height):
            running=false;
            break;
    }
    for(let i = 1; i<snake.length; i+=1){
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y)
            running=false;
    }
};
function displaygameover(){
    context.font = "60px Times New Roman";
    context.fillStyle = "black";
    context.textAlign = "center";
    context.fillText("GAME OVER!!", width/2, height/2);
    running=false;
};
function resetgame(){
    score=0;
    xvelocity=unitsize;
    yvelocity=0;
    snake = [
        {x:unitsize*4, y:0},
        {x:unitsize*3, y:0},
        {x:unitsize*2, y:0},
        {x:unitsize*1, y:0},
        {x:0, y:0}];    
    gamestart();
};
