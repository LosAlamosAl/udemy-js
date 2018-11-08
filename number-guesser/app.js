const min = 1;
const max = 10;
const maxGuesses = 4;
let goal;
let guessesLeft;
let isRunning;

function newGame() {
  goal = newRand(max);
  console.log('Goal: ' + goal);
  guessesLeft = maxGuesses;
  isRunning = true;
}

function newRand(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

const guess = document.getElementById('guess-input');
const submit = document.getElementById('guess-value');
const message = document.querySelector('.message');

submit.addEventListener('click', checkGuess);

newGame();


function checkGuess(e) {
  if (guess.value === '') return;
  const thisGuess = Number.parseInt(guess.value);
  console.log('This guess: ' + thisGuess);

  if (thisGuess < min || thisGuess > max) {
    chooseWisely();
    return;
  }
  if (thisGuess === goal) {
    youWin();
    return;
  }
  guessesLeft--;
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
