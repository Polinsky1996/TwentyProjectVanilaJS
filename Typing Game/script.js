const btnSettings = document.querySelector('#settings-btn');
const blockSettings = document.querySelector('#settings');
const difficultSetting = document.querySelector('#difficulty');
const btnRestartGame = document.querySelector('#btn-restart-game');
const wordContainer = document.querySelector('#word');
const input = document.querySelector('#text');
const timeContainer = document.querySelector('#time');
const scoreContainer = document.querySelector('#score');
const result = document.querySelector('#result');
const endGameContainer = document.querySelector('#end-game-container');
let level = 2;
let score = 0;
let seconds;
let timer;


const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

function displayWord() {
  wordContainer.innerText = getRandomWord();
}

function getRandomWord() {
  const index = Math.floor(Math.random() * words.length - 1);
  return words[index];
}

function checkCorrectEnter() {
  if (input.value === wordContainer.innerHTML) {
    seconds += level;
    input.value = '';
    updateScore();
    updateTimer();
    displayWord();
  }
}

function updateScore() {
  score++;
  scoreContainer.innerText = score;
}

function startTimer() {
  seconds = 10;
  updateTimer();
  timer = setInterval(changeTime, 1000);
}

function changeTime() {
  seconds--;
  checkLimitTime();
  updateTimer();
}

function updateTimer() {
  timeContainer.innerText = `${seconds}s`;
}

function checkLimitTime() {
  if (seconds === 0) {
    clearInterval(timer);
    showEndGameContainer();
  }
}

// if word correct plus timer: ease - 4s, medium - 2s, hard - 1s
function changeLevel() {
  level = +difficultSetting.value;
}

function showEndGameContainer() {
  result.innerText = score;
  endGameContainer.classList.add('hide');
}

function reloadGame() {
  startTimer();
  displayWord();
  input.value = '';
  score = 0;
  scoreContainer.innerText = score;
}

function showBlockSetting() {
  blockSettings.classList.toggle('hide');
}

input.addEventListener('input', checkCorrectEnter);
btnSettings.addEventListener('click', showBlockSetting);
difficultSetting.addEventListener('change', changeLevel);
btnRestartGame.addEventListener('click', () => {
  reloadGame();
  endGameContainer.classList.remove('hide');
});

displayWord();
startTimer();