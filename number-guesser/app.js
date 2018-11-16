/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
// @ts-nocheck

// TODO
// - remove up/down component from number guess field
// - match border color of number guess field to message (red and green)
// - set number guess field to empty at end of game
// message should say "n is not correct, yuo have m guesses left" (red)
// message should say "Sorry, game over, the correct answer was n" (red)
// message should say "n is correct!" (green)
// when game is over:
//  - last guess stays in number guess field
//  - button says PLAY AGAIN
//  - number guess field disabled

const min = 1;
const max = 10;
const maxGuesses = 4;
let goal;
let guessesLeft;
let isRunning;

function newGame() {
  goal = newRand(max);
  console.log(`Goal: ${goal}`);
  guessesLeft = maxGuesses;
  isRunning = true;
}

function newRand(maxRand) {
  return Math.floor(Math.random() * Math.floor(maxRand)) + 1;
}

const guess = document.getElementById('guess-input');
const submit = document.getElementById('guess-value');
const message = document.querySelector('.message');

submit.addEventListener('click', checkGuess);

newGame();

function checkGuess() {
  if (guess.value === '') return;
  const thisGuess = Number.parseInt(guess.value, 10);
  console.log(`This guess: ${thisGuess}`);

  if (thisGuess < min || thisGuess > max) {
    chooseWisely();
    return;
  }
  if (thisGuess === goal) {
    youWin();
    return;
  }
  guessesLeft -= 1;
  if (guessesLeft === 0) {
    noGuessesLeft();
  } else {
    wrongShowGuessesLeft();
  }
  guess.value = '';
}

function chooseWisely() {
  message.textContent = `Choose wisely, you have ${guessesLeft} guesses left`;
  message.style.color = '#f00';
  guess.value = '';
}

function youWin() {
  message.textContent = 'You win, play another?';
  message.style.color = '#0f0';
  newGame();
}

function noGuessesLeft() {
  message.textContent = 'No guesses left, play another?';
  message.style.color = '#f00';
  newGame();
}

function wrongShowGuessesLeft() {
  message.textContent = `Incorrect, you have ${guessesLeft} guesses left`;
  message.style.color = '#f00';
}
