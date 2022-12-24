'use strict';

//selecting elements
const player0_ele = document.querySelector('.player--0');
const player1_ele = document.querySelector('.player--1');
const score0_ele = document.getElementById('score--0');
const score1_ele = document.querySelector('#score--1');
const current0_ele = document.getElementById('current--0');
const current1_ele = document.getElementById('current--1');
const dice_ele = document.querySelector('.dice');
const btn_new = document.querySelector('.btn--new');
const btn_roll = document.querySelector('.btn--roll');
const btn_hold = document.querySelector('.btn--hold');

//starting conditions
let scores, activePlayer, isPlaying, current_score;

const init = function () {
  dice_ele.classList.add('hidden');

  scores = [0, 0];
  current_score = 0;
  activePlayer = 0;
  isPlaying = true;

  player0_ele.classList.remove('player--winner');
  player1_ele.classList.remove('player--winner');
  player1_ele.classList.remove('player--active');

  score0_ele.textContent = 0;
  score1_ele.textContent = 0;
  current0_ele.textContent = 0;
  current1_ele.textContent = 0;
};

init();

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
    player0_ele.classList.toggle('player--active');
    player1_ele.classList.toggle('player--active');
  } else {
    activePlayer = 0;
    player0_ele.classList.toggle('player--active');
    player1_ele.classList.toggle('player--active');
  }
}

//rolling dice functionality.
btn_roll.addEventListener('click', function () {
  if (isPlaying) {
    //unhide the dice
    dice_ele.classList.remove('hidden');

    //generate random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;

    dice_ele.src = `dice-${dice}.png`;

    //check for rolled 1: if true, switch to next player and make current 0

    if (dice === 1) {
      current_score = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        current_score;

      //switch to next player
      switchPlayer();
    } else {
      console.log('active player:', activePlayer);
      current_score += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        current_score;
    }
  }
});

btn_hold.addEventListener('click', function () {
  if (isPlaying) {
    scores[activePlayer] += current_score;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    console.log(scores);
    current_score = 0;

    if (scores[activePlayer] >= 100) {
      isPlaying = false;
      dice_ele.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }

    switchPlayer();
  }
});

btn_new.addEventListener('click', function () {
  init();
});
