// Disable some ESLint checks
/* eslint-disable no-multi-spaces */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
// @ts-nocheck


// Global game state
const min = 1;    // always 1 or nned to change newRand function
const max = 12;
const maxGuesses = 4;
let goal;
let guessesLeft;
let isGameOn;

// UI components
const guess = document.getElementById('guess-input');
const submit = document.getElementById('guess-value');
const message = document.querySelector('.message');


// Start a new game
function newGame() {
  goal = newRand(max);
  console.log(`Goal: ${goal}`);
  guessesLeft = maxGuesses;
  isGameOn = true;
  message.textContent = '';
  message.style.color = '';    // superfluous
  guess.value = '';
  submit.value = 'SUBMIT';
  guess.style.borderColor = '';
  guess.disabled = false;
}


// Generate a new random number in the range [1, maxRand]
function newRand(maxRand) {
  return Math.floor(Math.random() * Math.floor(maxRand)) + 1;
}


// Got here via a click on the button.
// It's a dual function button:
// - if it says SUBMIT, check the guess (isGameOn = true)
// - if it says PLAY AGAIN, start a new game (isGameOn = false)
function checkGuess() {
  if (!isGameOn) {   // submit (play again) starts new game
    newGame();
    return;
  }
  if (guess.value === '') {    // need to set to '' for bogus exponent (e.g. e3)
    guess.value = '';
    return;
  }
  const thisGuess = Number.parseInt(guess.value, 10);
  if (thisGuess < min || thisGuess > max) {      // bad number
    guess.value = '';
    return;
  }

  // correct guess
  if (thisGuess === goal) {
    youWin(thisGuess);
    return;
  }

  // wrong guesss
  guessesLeft -= 1;
  if (guessesLeft === 0) {
    youLose(thisGuess);
  } else {
    guessAgain(thisGuess);
  }
}


function youWin(g) {
  message.textContent = `${g} is correct!`;
  message.style.color = '#0f0';
  guess.style.borderColor = '#0f0';
  submit.value = 'PLAY AGAIN';
  guess.disabled = true;
  isGameOn = false;
}


function youLose(g) {
  message.textContent = `Sorry, game over, the correct answer was ${goal}`;
  message.style.color = '#f00';
  guess.style.borderColor = '#f00';
  submit.value = 'PLAY AGAIN';
  guess.disabled = true;
  isGameOn = false;
}


function guessAgain(g) {
  message.textContent = `${g} is not correct, you have ${guessesLeft} guesses left`;
  guess.value = '';
  message.style.color = '#f00';
}


//  Listen for clicks on the button
submit.addEventListener('click', checkGuess);

//  Show user range of acceptable guesses
document.querySelector('.max-num').innerHTML = max.toString();
document.querySelector('.min-num').innerHTML = min.toString();

// Start the first game.
// From here on out, everything is controlled by the event loop.
newGame();
