const firstDice = document.getElementById("firstDice");
const secondDice = document.getElementById("secondDice");
const points = document.getElementById("points");
const title = document.getElementById("title");
const rollBtn = document.getElementById("rollBtn")
const message = document.getElementById("message")

let playing = false;
let tries = 0;
function roll(){
    if (!playing){
        reset();
    }

    let firstNum = parseInt(Math.random() * 6 + 1);
    firstDice.src = "images/dice"+firstNum+".png"
    let secondNum = parseInt(Math.random() * 6 + 1);
    secondDice.src = "images/dice"+secondNum+".png"

    sum = firstNum + secondNum;

    points.innerText = sum;
    if (sum==7 || sum==11){
        showWin();
    }else if (sum==2 || sum==3 || sum==12){
        showLoss();
    }else{
        tries+=1;
        message.style.visibility = "visible"
        message.innerText = `Roll to hit your point. Tries: (${tries})`
    }
}

function showWin(){
    title.innerText = "Won Game!"
    rollBtn.innerText = "Play Again"
    playing=false;
    message.style.visibility = "hidden"
}

function showLoss(){
    title.innerText = "Lost Game!"
    rollBtn.innerText = "Play Again"
    playing=false;
    message.style.visibility = "hidden"

}

function reset(){
    tries=0;
    title.innerText = "Current Roll"
    rollBtn.innerText = "Roll Dice"
    playing=true;
    message.style.visibility = "hidden"

}