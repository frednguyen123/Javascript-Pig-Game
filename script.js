'use strict';

const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
// diagrams.net for flow charts
// Selecting elements
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const current0Element = document.querySelector('#current--0');
const current1Element = document.querySelector('#current--1');
// Another way of targeting the ID: 
// const score1 = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting Conditions
score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const init = function() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    document.querySelector(`#current--0`).textContent = 0;
    document.querySelector(`#current--1`).textContent = 0;
    document.querySelector('#score--0').textContent = 0;
    document.querySelector('#score--1').textContent = 0;
    document.querySelector(`.player--0`).classList.remove('player--winner');
    document.querySelector(`.player--1`).classList.remove('player--winner');
    document.querySelector(`.player--0`).classList.remove('player--active');
    document.querySelector(`.player--1`).classList.remove('player--active');
    document.querySelector(`.player--0`).classList.add('player--active');
}

const switchPlayer = function () {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    // Add the class if it is not there or remove if it is there
    // Start with player 0 with class, so toggle will remove
    // Start with player 1 without class, so toggle will add the class
    // Class player--active is the background color set on the player that's active
    player0Element.classList.toggle('player--active');
    player1Element.classList.toggle('player--active');
}

// Rolling dice function
btnRoll.addEventListener('click', function() {
    if(playing){
        // 1. Generating a random dice roll
        // 2. Display Dice
        // 3. Check for rolled 1: if true, switch to next player

        const dice = Math.trunc(Math.random() * 6) + 1;
        diceElement.classList.remove('hidden');
        // modify diceElement object to show dice image based on number using .src
        diceElement.src = `dice-${dice}.png`;
        
        if (dice !== 1){
            currentScore += dice;
            document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
            // current0Element.textContent = currentScore; 
        }
        else{
            switchPlayer();
        }
        console.log(dice);
    }
})

btnHold.addEventListener('click', function (){
    // 1. Add current score to active player's score
    if(playing){
        scores[activePlayer] += currentScore;
        document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if player's score is >= 100
        //    Finish game

        if (scores[activePlayer] >= 50){
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            diceElement.classList.add('hidden');
        }
        //  Switch to the next player 
        switchPlayer();
    }
})

btnNew.addEventListener('click', init);