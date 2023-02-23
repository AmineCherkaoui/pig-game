'use strict';

const player1El = document.querySelector('.player--1');
const player2El = document.querySelector('.player--2');

const score1El = document.getElementById('score--1');
const score2El = document.getElementById('score--2');

const current1El = document.getElementById('current--1');
const current2El = document.getElementById('current--2');

const diceEl = document.querySelector('.dice');

const newGameBtn = document.querySelector('.btn--new');
const rollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');

let playing = true,
  player = 1;

// Function to reset the game at 0
const reset = function () {
  // Reset all scores to 0
  score1El.textContent = 0;
  score2El.textContent = 0;
  current1El.textContent = 0;
  current2El.textContent = 0;
  // Add active player class from player1 and remove it from player2
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');

  // Hide roll and hold buttons
  rollBtn.classList.remove('hidden');
  holdBtn.classList.remove('hidden');

  // Remove winner class from the winner
  document
    .querySelector(`.player--${player}`)
    .classList.remove('player--winner');

  // Reset the player name
  document.getElementById(`name--${player}`).textContent = `Player ${player}`;

  // Reset the position of the newgame button
  newGameBtn.style.top = '';

  // Hide the Dice
  diceEl.classList.add('hidden');

  // Reset Player to 1 and playing to true
  playing = true;
  player = 1;
};

// Function to roll the dice
const roll = function () {
  if (playing) {
    //Random Number between 1 and 6
    let randomDice = Math.trunc(Math.random() * 6) + 1;

    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${randomDice}.png`;

    if (randomDice !== 1) {
      //CurrentScore = CurrentScore+RandomDice
      document.getElementById(`current--${player}`).textContent =
        Number(document.getElementById(`current--${player}`).textContent) +
        randomDice;
    } else {
      //switch player
      switchPlayer();
    }
  }
};

// Function to hold
const hold = function () {
  if (playing) {
    // score = score + currentScore
    document.getElementById(`score--${player}`).textContent =
      Number(document.getElementById(`score--${player}`).textContent) +
      Number(document.getElementById(`current--${player}`).textContent);

    // Reset the currentScore to 0
    document.getElementById(`current--${player}`).textContent = 0;

    diceEl.classList.add('hidden');

    // Max score to win
    if (document.getElementById(`score--${player}`).textContent >= 20) {
      // Add winner Class to player that win
      document
        .querySelector(`.player--${player}`)
        .classList.add('player--winner');

      //Remove  active  Class to player that win
      document
        .querySelector(`.player--${player}`)
        .classList.remove('player--active');

      //Add wins to player that wins
      document.getElementById(`name--${player}`).textContent += ' Wins';

      //Hide the dice
      diceEl.classList.add('hidden');

      playing = false;
    } else {
      switchPlayer();
    }
  }
  if (!playing) {
    //Hide the roll and hold buttons
    rollBtn.classList.add('hidden');
    holdBtn.classList.add('hidden');

    //Position the New game btn to the middle
    newGameBtn.style.top = '50%';
  }
};

// Function to switchPlayer
const switchPlayer = function () {
  //reset the currentScore
  document.getElementById(`current--${player}`).textContent = 0;
  //swicth player
  player = player === 1 ? 2 : 1;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
};

reset();

// function to swicth players

// Reset Btn
newGameBtn.addEventListener('click', reset);

// Roll btn
rollBtn.addEventListener('click', roll);

// Hold Btn
holdBtn.addEventListener('click', hold);

// Playing the game with Keyboard
document.addEventListener('keydown', e => {
  e.preventDefault();
  if (playing) {
    // By pressing Space player roll
    if (e.key === ' ') {
      roll();
    }
    // By pressing Enter player Hold
    else if (e.key === 'Enter') {
      hold();
    }
    // By pressing Escape player reset the game
    else if (e.key === 'Escape') {
      reset();
    }
  } else if (!playing) {
    // if Playing is false By pressing Space reset the Game
    if (e.key === ' ') {
      reset();
    }
  }
});
