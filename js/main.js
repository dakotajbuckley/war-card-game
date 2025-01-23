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

// FUNCTIONS

function draw2Cards() {
    fetch(`https://deckofcardsapi.com/api/deck/${localStorage.getItem('deckID')}/draw/?count=2`)
    .then(res => res.json())
    .then( data => {
        document.querySelector('#player1').src = data.cards[0].image
        document.querySelector('#player2').src = data.cards[1].image
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
        console.log(data)
        let player1pile = []
        let player2pile = []
        for (let i = 0; i < 52; i++) {
            if (i % 2 == 0) {
                player2pile.push(data.cards[i].code)
            } else {
                player1pile.push(data.cards[i].code)
            }
            console.log(data.cards[i].code)
        }
        console.log(player1pile)
        console.log(player2pile)
    })
}