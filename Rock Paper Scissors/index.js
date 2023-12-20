const PlayerText = document.querySelector("#Playertext");
const ComputerText = document.querySelector("#Computertext");
const ResultText = document.querySelector("#Resulttext");
const choiceButtons = document.querySelectorAll(".choiceButton");
let player;
let computer;
let result;

choiceButtons.forEach(button => button.addEventListener("click", () => {
    player = button.textContent;
    computerTurn();
    console.log(player);
    PlayerText.textContent = `Player: ${player}`;
    ComputerText.textContent = `Computer: ${computer}`;
    ResultText.textContent = `${Checkwinner()}`;
})); 

function computerTurn(){
    const randNum = Math.floor(Math.random() * 3) +1;
    switch(randNum){
        case 1:
            computer = "Rock";
            break;
        case 2:
            computer = "Paper";
            break;
        case 3:
            computer = "Scissors";
            break;
        }
}
function Checkwinner(){
    if(player == computer){
        return "Draw!!";
    }
    else if(player == "Rock"){
        return (computer == "Paper") ? "You Lose!" : "You Win!"
    }
    else if(player == "Paper"){
        return (computer == "Rock") ? "You Win!" : "You Lose!"
    }
    else if(player == "Scissors"){
        return (computer == "Paper") ? "You Win!" : "You Lose!"
    }
}