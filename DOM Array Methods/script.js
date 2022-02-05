'use strict';

const formNavigator = document.querySelector('.form__navigation');
const formOutputBlock = document.querySelector('.form__out-block');
const formTotalWealth = document.querySelector('.out--total');
let viewPerson = [];

function CreatePerson(name, wealth) {
    this.name = name,
    this.wealth = wealth
}

function addUser() {
    fetch('https://randomuser.me/api/')
        .then(result => result.json())
        .then(({results}) => {
            const name = results['0']['name']['first'] + ' ' + results['0']['name']['last'];
            const wealth = (Math.floor(Math.random() * (2e6 - 0) + 0));

            createNewPerson(name, wealth);
            createElementPersonOnPage(name, wealth);
        });
}

function sortRechest() {
    formOutputBlock.innerHTML = '';
    viewPerson.sort((a, b) => b.wealth - a.wealth).forEach( person => {
        createElementPersonOnPage(person.name, person.wealth);
    });
}

function doubleMoney() {
    formOutputBlock.innerHTML = '';
    viewPerson.forEach( person => {
        person.wealth *= 2;
        createElementPersonOnPage(person.name, person.wealth);
    });
}

function showOnlyMillionaires() {
    formOutputBlock.innerHTML = '';

    viewPerson = viewPerson.filter(person => {
        if (+person.wealth >= 1000000) {
            createElementPersonOnPage(person.name, person.wealth);
            return person;
        }
    });
}

function calculateEntire() {
    let entire = 0;

    viewPerson.forEach( person => {
        entire += person.wealth;
    });

    document.querySelector('.out--entire').textContent = `${entire.toLocaleString('de-DE')}.00`;
    formTotalWealth.classList.remove('out--hidden');
}

function createNewPerson(name, wealth) {
    const person = new CreatePerson(name, wealth);
    viewPerson.push(person);
}

function createElementPersonOnPage(name, wealth) {
    formOutputBlock.insertAdjacentHTML('beforeend', `
            <div class="form__item-out">
                <div class="form__name-person">${name}</div>
                <div class="form__wealth-person">$${wealth.toLocaleString('de-DE')}.00</div>
            </div>
        `);
        
    formTotalWealth.classList.add('out--hidden');
} 


formNavigator.addEventListener('click', event => {
    const target = event.target;

    if(target && target.tagName === 'BUTTON') {
        switch (target.id) {
            case 'add_user': addUser();
                break;
            case 'double_money': doubleMoney();
                break;
            case 'show-millionaires': showOnlyMillionaires();
                break;
            case 'sort-richest': sortRechest();
                break;
            case 'calculate-entire': calculateEntire();
                break;
        }
    }
});

addUser();
addUser();
addUser();