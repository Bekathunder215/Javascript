const gameboard = document.querySelector("#gameboard");
const context = gameboard.getContext("2d");
const scoretext = document.querySelector("#scoretext");
const resetbtn = document.querySelector("#resetbtn");
const width = gameboard.width;
const height = gameboard.height;
const boardbg = "lightgreen";
const paddle1color = "white";
const paddle2color = "black";
const paddleborder = "darkgrey";
const ballcolor = "red";
const ballborder = "darkgrey";
const ballradius = 12.5;
const paddlespeed = 50;
let intervallid;
let running = false;
let ballspeed = 10;
let ballx = width/2;
let bally = height/2;
let ballxdir = 0;
let ballydir = 0;
let p1score = 0;
let p2score = 0;
let paddle1 = {
    pwidth:25,
    pheight:100,
    x:0,
    y:0
}
let paddle2 = {
    pwidth:25,
    pheight:100,
    x:width-25,
    y:height-100
}
window.addEventListener("keydown", changedirection);
resetbtn.addEventListener("click", resetgame);
gamestart();

function gamestart(){
    running=true;
    createball();
    nexttick();    
};

function nexttick(){
    intervallid = setTimeout(() => {
        clearboard();
        drawpaddles();
        moveball();
        drawball(ballx, bally);
        checkcollision();
        nexttick();
    }, 10);
};

function clearboard(){
    context.fillStyle = boardbg;
    context.fillRect(0,0,width,height);
};

function drawpaddles(){
    context.strokeStyle = paddleborder;
    context.fillStyle = paddle1color;
    context.fillRect(paddle1.x, paddle1.y, paddle1.pwidth, paddle1.pheight);
    context.strokeRect(paddle1.x, paddle1.y, paddle1.pwidth, paddle1.pheight);
    context.fillStyle = paddle2color;
    context.fillRect(paddle2.x, paddle2.y, paddle2.pwidth, paddle2.pheight);
    context.strokeRect(paddle2.x, paddle2.y, paddle2.pwidth, paddle2.pheight);
};

function drawball(ballx, bally){
    context.fillStyle = ballcolor;
    context.strokeStyle = ballborder;
    context.lineWidth = 2;
    context.beginPath();
    context.arc(ballx, bally, ballradius,0, 2*Math.PI);
    context.stoke;
    context.fill();
};

function createball(){
    ballspeed = 1;
    if(Math.round(Math.random())==1){
        ballxdir = 1;
    }
    else{
        ballxdir = -1;
    }
    if(Math.round(Math.random())==1){
        ballydir = 1;
    }
    else{
        ballydir = -1;
    }
    ballx = width/2;
    bally = height/2;
    drawball(ballx, bally)
};
function moveball(){
    ballx += (ballspeed*ballxdir);
    bally += (ballspeed*ballydir);
};
function checkcollision(){
    if(bally <= 0 + ballradius){
        ballydir *= -1;
    }
    if(bally >=height-ballradius){
        ballydir *= -1;
    }
    if(ballx <= 0){
        p2score+=1;
        updatescore();
        createball();
        return;
    }
    if(ballx >= width){
        p1score+=1;
        updatescore();
        createball();
        return;
    }
    if(ballx <= (paddle1.x + paddle1.pwidth + ballradius)){
        if(bally >= paddle1.y && bally < paddle1.y + paddle1.pheight){
            ballx = (paddle1.x + paddle1.pwidth + ballradius);
            ballxdir*=-1;
            ballspeed+=0.2;
        }
    }
    if(ballx >= (paddle2.x - ballradius)){
        if(bally >= paddle2.y && bally < paddle2.y + paddle2.pheight){
            ballx = (paddle2.x - ballradius);
            ballxdir*=-1;
            ballspeed+=0.2;
        }
    }


};

function changedirection(key){
    const keypress = key.keyCode;
    const w = 87;
    const s = 83;
    const up = 38;
    const down = 40;

    switch(keypress){
        case(w):
            if(paddle1.y > 0){
                paddle1.y -= paddlespeed;
            }
            break;
        case(s):
            if(paddle1.y < height - paddle1.pheight){
                paddle1.y += paddlespeed;
        }
        break;
        case(up):
            if(paddle2.y > 0){        
                paddle2.y -= paddlespeed;
            }
            break;
        case(down):
            if(paddle2.y < height - paddle2.pheight){
                paddle2.y += paddlespeed;
            }
            break;
    };

};

function updatescore(){
    scoretext.textContent = `${p1score} : ${p2score}`
};
function resetgame(){
    p1score = 0;
    p2score = 0;
    paddle1 = {
        pwidth:25,
        pheight:100,
        x:0,
        y:0
    }
    paddle2 = {
        pwidth: 25,
        pheight: 100,
        x:width-25,
        y:height-100
    }
    ballspeed = 1;
    ballx = width/2;
    bally = height/2;
    ballxdir = 0;
    ballydir = 0;
    updatescore();
    clearInterval(intervallid);
    gamestart();
};