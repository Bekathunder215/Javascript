const display = document.getElementById("display");
var audio = new Audio("tap.ogg");
var nice = new Audio("wow.mp3");
function appendToDisplay(input){
    display.value += input;
    audio.play();
    audio.currentTime = 0
}

function ClearDisplay(){
    display.value = "";
    audio.play();
    audio.currentTime = 0
}

function percentage(){
    display.value = eval(display.value/100);
    audio.play();
    audio.currentTime = 0
}

function Calculate(){
    try{
        display.value = eval(display.value);
        if (display.value == "69"){
            nice.play();
            nice.currentTime = 0
            }
        else{
            audio.play();
            audio.currentTime = 0
            }
    }
    catch(error){
        display.value = "Error";
    }

}
function reverse(){
    display.value = eval(-display.value);
    audio.play();
    audio.currentTime = 0
}