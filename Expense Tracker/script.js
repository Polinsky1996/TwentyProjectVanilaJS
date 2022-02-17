const balance = document.querySelector('.balance__condition');
const income = document.querySelector('.income__condition');
const expense = document.querySelector('.expense__condition');
const history = document.querySelector('.history');
const inputText = document.querySelector('#text');
const inputAmount = document.querySelector('#amount');
const btnNewTransaction = document.querySelector('#new-transaction');
const modal = document.querySelector('.modal');

function getLocalData() {
    const localAmount = JSON.parse(localStorage.getItem('localAmount'));
    const localText = JSON.parse(localStorage.getItem('localText'));

    localAmount.forEach( (item, index) => {
        addTransaction(item, localText[index]);
    });
}

function addTransaction(number, text) {
    const amount = number > 0 ? '+' + number : number;

    history.innerHTML += `
        <div class="transaction ${number >= 0 ? 'transaction--income' : 'transaction--expense'}">
            <button class="button__delete"></button>
            <div class="text">${text}</div>
            <div class="number">${amount}</div>
        </div>
    `;

    calculate();
}

function calculate() {
    let incomeTotal = 0;
    let expenseTotal = 0;

    history.querySelectorAll('.number').forEach( item => {
        const number = +item.innerText;

        if (number >= 0) {
            incomeTotal += number; 
        }
        else {
            expenseTotal += number;
        }
    });

    income.innerHTML = `$${incomeTotal.toFixed(2)}`;
    expense.innerHTML = `$${expenseTotal.toFixed(2)}`;
    balance.innerHTML = `$${(incomeTotal + expenseTotal).toFixed(2)}`;

    localSetTrancsaction();
}

function checkInput() {
    if (inputText.value.trim() === '' || inputAmount.value.trim() === '') {
        modal.style = 'display: block';

        setTimeout(() => {
            modal.style = 'display: none';
        }, 4000);

        return false;
    }
    else {
        return true;
    }
}

function localSetTrancsaction() {
    const localText = [];
    const localAmount = [];

    document.querySelectorAll('.number').forEach( item => {
        localAmount.push(item.innerText.replace('+', '')); 
    });

    document.querySelectorAll('.text').forEach( item => {
        localText.push(item.innerText); 
    });

    localStorage.setItem('localText', JSON.stringify(localText));
    localStorage.setItem('localAmount', JSON.stringify(localAmount));
}

btnNewTransaction.addEventListener('click', () => {
    if (checkInput()) {
        addTransaction(inputAmount.value, inputText.value);
        inputText.value = '';
        inputAmount.value = '';
    }
});

history,addEventListener('click', event => {
    const target = event.target;

    if (target && target.classList.contains('button__delete')) {
        target.parentElement.remove();
        calculate();
    }
});

getLocalData();