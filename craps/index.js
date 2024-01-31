let sum = 0;
let target;
let firstTime = true;

//store img elements as objects
let dice1img = document.getElementById("dice1");
let dice2img = document.getElementById("dice2");
let rollNumber = document.getElementById("rollNumber");
let message = document.getElementById("message");
let gameButton = document.getElementById('gameButton')
let gameContainer = document.getElementById('gameContainer')

function roll() {
  //roll dice 1
  let rand = Math.floor(Math.random() * 6 + 1);
  let num1 = rand;
  dice1img.src = "images/dice" + num1 + ".png";

  //roll dice 2
  rand = Math.floor(Math.random() * 6 + 1);
  let num2 = rand;
  dice2img.src = "images/dice" + num2 + ".png";

  //get sum
  sum = num1 + num2;
  rollNumber.innerText = sum;

  //conditions
  if (firstTime) {
    if (sum == 7 || sum == 11) {
      message.innerText = "You win";
      endGame()
    } else if (sum == 2 || sum == 3 || sum == 12) {
      message.innerText = "You lose";
      endGame()
    } else {
      target = sum;
      message.innerText = "Roll to hit your point (" + target + ")";
    }
    firstTime = false;
    return;
  }

  if (sum == target) {
    message.innerText = "You win";
    endGame()
  } else if (sum == 7) {
    message.innerText = "You lose";
    endGame()
  } else {
    message.innerText = "Roll to hit your point (" + target + ")";
  }
}

function endGame(){
  gameButton.remove()
}