const cells = document.querySelectorAll(".cell");
const statustext = document.querySelector("#statustext");
const restartbtn = document.querySelector("#restartbtn");
const wincondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [6, 4, 2],
    [0, 4, 8],
    [2, 5, 8],
    [1, 4, 7],
    [0, 3, 6],
];
let options = ["","","","","","","","",""];
let currentplayer = "X";
let running = false;

initializegame();

function initializegame(){
    cells.forEach(cell => cell.addEventListener("click", cellclicked));
    restartbtn.addEventListener("click", restartgame);
    statustext.textContent = `${currentplayer}'s turn`;
    running = true;
}
function cellclicked(){
    const cellindex = this.getAttribute("cellindex");
    if(options[cellindex] != "" || !running){
        console.log(this.getAttribute("cellindex"));
        return;
    }
    updatecell(this, cellindex);
    checkwinner();
}
function updatecell(cell, index){
    options[index] = currentplayer;
    cell.textContent = currentplayer;
}
function changeplayer(){
    currentplayer = (currentplayer == "X") ? "O" : "X";
    statustext.textContent = `${currentplayer}'s turn`;
}
function checkwinner(){
    let roundwon = false;
    for(let i=0; i< wincondition.length; i++){
        const condition = wincondition[i];
        const cella = options[condition[0]];
        const cellb = options[condition[1]];
        const cellc = options[condition[2]];
    if(cella == "" || cellb == "" || cellc == ""){
        continue;
    }
    if(cella == cellb && cellb == cellc){
        roundwon = true;
        break;
    }
    }
    if(roundwon){
        statustext.textContent = `${currentplayer} wins!!`
        running = false;
    }
    else if(!options.includes("")){
        statustext.textContent = `Draw!`
        running=false;
    }
    else{
        changeplayer();
    }
}
function restartgame(){
    currentplayer == "X";
    options = ["","","","","","","","",""];
    statustext.textContent = `${currentplayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running=true;
}

