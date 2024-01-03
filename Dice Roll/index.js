

function rollDice(){
    const numdice = document.getElementById("input").value;
    const diceresult = document.getElementById("diceResult");
    const diceimgs = document.getElementById("diceImgs");
    const values = [];
    const images = [];
    
    for(let i=0; i< numdice; i++){
        const value = Math.floor(Math.random() * 6) + 1;
        values.push(value);
        images.push(`<img src="Diceimgs/gamedice${value}.png">`);
    }
    diceresult.textContent = `Dice: ${values.join(', ')}`;
    diceimgs.innerHTML = images.join('');
}