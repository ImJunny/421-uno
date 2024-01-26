let player=1; //player 1 is you
let drawDeck=[]
let discardDeck=[]
let theirDeck=[]
let yourDeck=[]
let colors = ['red','yellow','green','blue']
let symbols = [0,1,2,3,4,5,6,7,8,9]

function startGame(){
    makeDeck()
    shuffleDeck()
    assignCards()
    render()
}

function makeDeck(){
    for(let i=0; i<1; i++){
        colors.forEach(c=>{
            symbols.forEach(s=>{
                drawDeck.push({color:c, symbol:s})
            })
        })
    }
}

function shuffleDeck(){
    for(let i=0; i<drawDeck.length; i++){
        let j = Math.floor(Math.random()*(i+1))
        let temp = drawDeck[i]
        drawDeck[i] = drawDeck[j]
        drawDeck[j] = temp
    }
}

function assignCards(){
    drawCard(0,7)
    drawCard(1,7)
    discardDeck.push(drawDeck[0])
    drawDeck = drawDeck.slice(1)
}

function drawCard(player, amount){
    for(let i=0; i<amount; i++){
        if(player==1){
            yourDeck.push(drawDeck[0])
        }else{
            theirDeck.push(drawDeck[0])
        }
        drawDeck = drawDeck.slice(1)
    }
}

let discardContainer = document.getElementById('discardContainer')
let drawContainer = document.getElementById('drawContainer')
let theirContainer = document.getElementById('theirContainer')
let yourContainer = document.getElementById('yourContainer')

function render(){
    discardContainer.innerHTML="";
    drawContainer.innerHTML="";
    theirContainer.innerHTML="";
    yourContainer.innerHTML="";

    updateGameState()

    renderVisibleCard(discardContainer,discardDeck[discardDeck.length-1])
    if(drawDeck.length>0)
    renderInvisibleCard(drawContainer)
    theirDeck.forEach(()=>renderInvisibleCard(theirContainer))
    yourDeck.forEach((card,index)=>renderVisibleCard(yourContainer,card,index))
}

function renderVisibleCard(container,passedCard,index){
    let card = document.createElement('div')
    card.setAttribute('class','cardContainer')
    let backdrop = document.createElement('div')
    backdrop.setAttribute('class','cardBackdrop')
    let symbol = document.createElement('p')
    symbol.setAttribute('class','cardSymbol')        

    card.style.backgroundColor=passedCard.color
    symbol.style.color=passedCard.color
    symbol.innerText=passedCard.symbol

    card.appendChild(backdrop)
    card.appendChild(symbol)
    container.appendChild(card)
    //if match, give highlight and hover class
    if(player==1 && isMatch(passedCard) && container==yourContainer){
        card.classList.add('clickableCard')
        card.addEventListener('click',()=>{
            placeCard(passedCard,index)
            changePlayer()
            //render()
            setTimeout(()=>{render,setTimeout},1000)
        })
    }
}

function renderInvisibleCard(container){
    let card = document.createElement('div')
    card.setAttribute('class','cardContainer')
    let backdrop = document.createElement('div')
    backdrop.setAttribute('class','cardBackdrop')
    let symbol = document.createElement('p')
    symbol.setAttribute('class','cardSymbol')

    card.style.backgroundColor="black"
    backdrop.style.backgroundColor="red"
    symbol.style.color="gold"
    symbol.style.fontSize="35px"
    symbol.style.webkitTextStroke=0;
    symbol.style.rotate="-10deg"
    symbol.innerText="UNO"

    card.appendChild(backdrop)
    card.appendChild(symbol)
    container.appendChild(card)
    //if draw, make clickable
    if (player==1 && container==drawContainer){
        card.classList.add('clickableCard')
        card.addEventListener('click',()=>{
            drawCard(1,1)
            render()
            setTimeout(theirTurn,1000)
            changePlayer()
        })
    }
    
}

function isMatch(card){
    if (discardDeck[discardDeck.length-1].color==card.color || discardDeck[discardDeck.length-1].symbol==card.symbol)
        return true;
    return false;
}

function placeCard(card,index){
    discardDeck.push(card)
    yourDeck.splice(index,1)
}

function theirTurn(){
    for(let i=0; i<theirDeck.length; i++){
        let card=theirDeck[i]
        if(isMatch(card)){
            discardDeck.push(card)
            theirDeck.splice(i,1)
            changePlayer()
            render() 
            return;
        }
    }
    drawCard(0,1)
    changePlayer()
    render();
}

function updateGameState(){
    if (theirDeck.length==0 || yourDeck.length==0){
        let message = document.createElement('p')
        message.setAttribute('id','message')
        if(theirDeck.length==0){
            message.innerText="You Lose"
            theirContainer.appendChild(message)
        }else{
            message.innerText="You Win"
            yourContainer.appendChild(message)
        }
        clearTimeout()
        player=-1
    }
    if(drawDeck.length==0){
        drawDeck=discardDeck
        shuffleDeck()
        discardDeck=[]
        discardDeck.push(drawDeck[0])
        drawDeck = drawDeck.slice(1)
    }
}

function changePlayer(){
    if (player==1)
        player=0;
    else
        player=1;
}

startGame();