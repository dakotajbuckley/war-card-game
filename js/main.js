// EVENT LISTENERS

document.querySelector('button').addEventListener('click', draw2Cards)
document.querySelector('#shuffle').addEventListener('click', shuffleDeck)

// GLOBAL VARIABLES

if (!localStorage.getItem('deckID')) {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1') 
    .then(res => res.json())
    .then(data => {
        localStorage.setItem('deckID', data.deck_id)
    })
}

let player1pile = []
let player2pile = []

// FUNCTIONS

function draw2Cards() {
    drawPlayer1Card()
    drawPlayer2Card()
}

async function drawPlayer1Card() {
    await fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckID')}/pile/player1/draw/`)
    .then(res => res.json())
    .then( data => {
        console.log(data)
        document.querySelector('#player1').src = data.cards[0].image
    })
}

async function drawPlayer2Card() {
    await fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckID')}/pile/player2/draw/`)
    .then(res => res.json())
    .then( data => {
        console.log(data)
        document.querySelector('#player2').src = data.cards[0].image
    })
}

function shuffleDeck() {
    fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckID')}/shuffle/`)
    .then(res => res.json())
    .then(data => console.log(data))
}

function splitDeckToTwo() {

    fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckID')}/draw/?count=52`)
    .then(res => res.json())
    .then( data => {
        player1pile = []
        player2pile = []
        console.log(data)
        for (let i = 0; i < 52; i++) {
            if (i % 2 == 0) {
                player2pile.push(data.cards[i].code)
            } else {
                player1pile.push(data.cards[i].code)
            }
        }
    })
}

async function createPile() {
    // console.log(player1pile.join(','))
    await fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckID')}/pile/player1/add/?cards=${player1pile.join(',')}`)
    .then(res => res.json())
    .then(data => console.log(data))
    await fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckID')}/pile/player2/add/?cards=${player2pile.join(',')}`)
    .then(res => res.json())
    .then(data => console.log(data))
    // fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckID')}/pile/player1/list/`)
    // .then(res => res.json())
    // .then(data => console.log(data))
    // fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckID')}/pile/player2/list/`)
    // .then(res => res.json())
    // .then(data => console.log(data))
}