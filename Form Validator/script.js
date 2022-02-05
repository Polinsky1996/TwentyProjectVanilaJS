//My version

/*
const inputForm = document.querySelectorAll('.form--input-block');
const inputAlert = document.querySelectorAll('.form__input-alert');
const btnSubmit = document.querySelector('.form__button');

btnSubmit.addEventListener('click', () => {
    checkInputCorrect();
});

function checkInputCorrect() {
    inputCorrect();

    if (inputForm[0].value.length < 3) {
        inputError(0, 'Username must be at least 3 characters');
    }
    if (!/\w+\@\w+\.\w+/gi.test(inputForm[1].value)) {
        inputError(1, 'Email is not valid');
    }
    if (inputForm[2].value === '' || inputForm[2].value.length < 6 || /\s+/g.test(inputForm[2].value)) {
        inputError(2, 'Password must be at least 6 characters');  
    }
    if (inputForm[2].value === '') {
            inputError(3, 'Password2 is required');   
    } else if (inputForm[2].value != inputForm[3].value) {; 
        inputError(3, 'Passwords do not match');
    }

    function inputCorrect() {
        for (let i = 0; i < inputForm.length; i++) {
            inputAlert[i].innerHTML = '';
            inputForm[i].classList.remove('input-block--error');
            inputForm[i].classList.add('input-block--success');
        }
    }

    function inputError(element, text) {
        inputForm[element].classList.remove('input-block--success');
        inputForm[element].classList.add('input-block--error');
        inputAlert[element].innerHTML = text;
    }
}
*/

// Version Bred

const submit = document.querySelector('.form__button');
const username = document.querySelector('#login');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');


function checkCorrectEmail(input) {
    if (!/\w+\@\w+\.\w+/gi.test(input.value)) {
        inputError(input, `Email is inncorect`);
    }
    else {
        inputSuccess(input);
    }
}

function comparePasswords(password, password2) {
    if (password.value != password2.value) {
        inputError(password2, 'Password do not match');
    }
    else {
        inputSuccess(password2);
    }
}

function inputCheck(inputArr) {
    inputArr.forEach(item => {
        if (item.value == '') {
            inputError(item, `${getInputID(item.id)} is requied`);
        }
    });
}

function inputCheckLength(input, min, max) {
    let nameItem = input.id;
    if (input.value.length < min && input.value.length != '') {
        inputError(input, `Length ${nameItem} less than ${min} symbols`);
    } else if (input.value.length > max && input.value.length != '') {
        inputError(input, `Length ${nameItem} more than ${max} symbols`);
    }
    else {
        inputSuccess(input);
    }
}

function inputError(input, message) {
    input.classList.add('input-block--error');
    input.classList.remove('input-block--success');
    input.nextElementSibling.textContent = message;
}

function inputSuccess(input) {
    input.classList.remove('input-block--error');
    input.classList.add('input-block--success');
    input.nextElementSibling.textContent = '';
}

function getInputID(name) {
    return name[0].toUpperCase() + name.slice(1);
}

submit.addEventListener('click', e => {
    // e.defaultPrevented();
    inputCheckLength(username, 3, 15);
    inputCheckLength(password, 6, 25);
    checkCorrectEmail(email);
    comparePasswords(password, password2);
    inputCheck([username, email, password, password2]);
});



function duplicateEncode(word){
    let countLetter = {}; 
    let strSplit = word.toLowerCase().split('');

    strSplit.forEach(item => {
        countLetter[item] = (countLetter[item] || 0) + 1;
    });

    return strSplit.map(item => {
        return countLetter[item] >= 2 ? ')' : '(';
    }).join('');
}


function duplicateEncode2(word){
    return word
      .toLowerCase()
      .split('')
      .map( function (a, i, w) {
        return w.indexOf(a) == w.lastIndexOf(a) ? '(' : ')';
      })
      .join('');
}


console.time('first function');
console.log(duplicateEncode('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'));
console.timeEnd('first function');

console.time('second function');
console.log(duplicateEncode2('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'));
console.timeEnd('second function');