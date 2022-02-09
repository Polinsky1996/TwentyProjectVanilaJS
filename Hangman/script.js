const blockWord = document.querySelector('.hangman__word');
const takenLetters = document.querySelector('.hangman__taken-letters');
const btnNewGame = document.querySelectorAll('.new-game');
const array = ['computer', 'framework', 'display', 'programming', 'documentation', 'photoshop'];
const usedLetters = [];
let word = '';
let attempt = 0;
let correct = 0;
let final = false;


function randomWords() {
    word = array[Math.floor(Math.random()*array.length)].split('');
    console.log(word);
}

function newGame() {
    randomWords();
    blockWord.innerHTML = '';
    takenLetters.innerHTML = '';
    usedLetters.length = 0;
    document.querySelectorAll('.hangman-part').forEach( element => element.style = 'display: none');
    parseWord(word);
    attempt = 0;
    correct = 0;
    final = false;
}

window.addEventListener('keydown', event => {
    if (!final) {
        checkLetter(event.key);
    }
    checkList();
});

btnNewGame.forEach(button => {
    button.addEventListener('click', () => {
        newGame();
        document.querySelector('.modal-lose').style = 'display: none';
        document.querySelector('.modal-win').style = 'display: none';
    });
});

function parseWord(word)  {
    word.forEach( i => blockWord.insertAdjacentHTML('beforeend', `<div class="hangman__letter"></div>`));
}

function checkLetter(letter) {
    if (usedLetters.includes(letter)) {
        console.log('This letter was used');
    }
    else if ((/\b[a-z]\b/i).test(letter)) {
        addLetterList(letter);
    }
}

function checkList() {
    if (attempt === 6) {
        showModalLose();
        final = true;
    }
    else if (correct === word.length) {
        showModalWin();
        final = true;
    }
}

function showModalLose() {
    document.querySelector('.modal-lose').style = 'display: flex';
}

function showModalWin() {
    document.querySelector('.modal-win').style = 'display: flex';
}

function addLetterList(letter) {
    let available = false;
    usedLetters.push(letter);

    word.forEach( (item, index) => {
        if (item === letter) {
            openLetter(letter, index);
            correct += 1;
            available = true;
        }
    });

    if (!available) {
        takenLetters.innerHTML += letter;
        showElementHangman();
        attempt += 1;
    }
}

function openLetter(letter, index) {
    const cells = document.querySelectorAll('.hangman__letter');
    cells[index].innerHTML = letter;
}

function showElementHangman() {
    document.querySelectorAll('.hangman-part')[attempt].style = 'display: block';
}

newGame();
