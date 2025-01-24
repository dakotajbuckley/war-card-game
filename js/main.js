// EVENT LISTENERS

document.querySelector('button').addEventListener('click', draw2Cards)
document.querySelector('#shuffle').addEventListener('click', shuffleDeck)

// GLOBAL VARIABLES

if (!localStorage.getItem('deckIDPlayer1')) {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('deckIDPlayer1', data.deck_id)
        })
}

if (!localStorage.getItem('deckIDPlayer2')) {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('deckIDPlayer2', data.deck_id)
        })
}

let player1pile = []
let player2pile = []

// FUNCTIONS

function draw2Cards() {

    let player1Value;
    let player2Value;
    let player1CardCode;
    let player2CardCode;

    drawPlayer1Card()

    
}

async function drawPlayer1Card() {

    await fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckIDPlayer1')}/pile/player1/draw/`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.querySelector('#player1').src = data.cards[0].image
            player1Value = convertValue(data.cards[0].value)
            player1CardCode = data.cards[0].code
        })
    drawPlayer2Card()
}

async function drawPlayer2Card() {

    await fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckIDPlayer1')}/pile/player2/draw/`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            document.querySelector('#player2').src = data.cards[0].image
            player2Value = convertValue(data.cards[0].value)
            player2CardCode = data.cards[0].code
        })
        compareValues()
}

async function compareValues() {
    console.log(player1CardCode)
    if (player1Value > player2Value) {
        document.querySelector('#winner').innerText = "Player 1 Won!"
        fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckIDPlayer1')}/pile/player1/add/?cards=${player1CardCode + "," +player2CardCode}`)
        .then(res => res.json())
        .then(data => {
            document.querySelector('#P1Remaining').innerText = data.piles.player1.remaining
            document.querySelector('#P2Remaining').innerText = data.piles.player2.remaining
        })

    } else if (player2Value > player1Value) {
        document.querySelector('#winner').innerText = "Player 2 Won!"
        fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckIDPlayer1')}/pile/player2/add/?cards=${player1CardCode + "," + player2CardCode}`)
        .then(res => res.json())
        .then(data => {
            document.querySelector('#P1Remaining').innerText = data.piles.player1.remaining
            document.querySelector('#P2Remaining').innerText = data.piles.player2.remaining
        })
    } if (player1Value === player2Value) {
        await fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckIDPlayer1')}/pile/player1/draw/?count=4`)
        .then(res => res.json())
        .then(data => console.log(data))

        await fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckIDPlayer1')}/pile/player2/draw/?count=4`)
        .then(res => res.json())
        .then(data => console.log(data))
    }
}

function convertValue(value) {
    if (value === 'ACE') {
        return 14
    } else if (value === 'KING') {
        return 13
    } else if (value === 'QUEEN') {
        return 12
    } else if (value === 'JACK') {
        return 11
    } else {
        return Number(value)
    }
}

async function shuffleDeck() {
    await fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckIDPlayer1')}/shuffle/`)
        .then(res => res.json())
        .then(data => console.log(data))
    
    splitDeckToTwo()
}

async function splitDeckToTwo() {

    await fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckIDPlayer1')}/draw/?count=52`)
        .then(res => res.json())
        .then(data => {
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
    // await fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckIDPlayer2')}/draw/?count=52`)

    createPile()
}

async function createPile() {
    // console.log(player1pile.join(','))
    await fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckIDPlayer1')}/pile/player1/add/?cards=${player1pile.join(',')}`)
    .then(res => res.json())
    .then(data => console.log(data))
    await fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckIDPlayer1')}/pile/player2/add/?cards=${player2pile.join(',')}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        document.querySelector('#P1Remaining').innerText = data.piles.player1.remaining
        document.querySelector('#P2Remaining').innerText = data.piles.player2.remaining
    })
    // fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckID')}/pile/player1/list/`)
    // .then(res => res.json())
    // .then(data => console.log(data))
    // fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckID')}/pile/player2/list/`)
    // .then(res => res.json())
    // .then(data => console.log(data))
}