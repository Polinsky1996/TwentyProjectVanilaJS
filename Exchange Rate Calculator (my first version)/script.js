// ba348d21d81d11096752af13
const upSelect = document.querySelector('#up');
const lowSelect = document.querySelector('#low');
const upInput = document.querySelector('#up_input');
const divOutResult = document.querySelector('#low_input');
const buttonSwapSelect = document.querySelector('#button');
const url = 'https://v6.exchangerate-api.com/v6/ba348d21d81d11096752af13/latest/';

let selectedOptionUp = 'USD';
let selectedOptionLow = 'EUR';

function getExchangeRateServer(url, currency, callback) {
    fetch(url + currency)
        .then(data => {
            return data.json();
        })
        .then(dataClient => {
            return callback(dataClient);
        });
}

function checkFirstStart() {
    const haveData = JSON.parse(localStorage.getItem('haveData'));

    if (!haveData) {
        getExchangeRateServer(url,'USD', setExchangeRateToLocalStorage);    
    }
    else {
        fillSelectOptions();
    }
}

function setExchangeRateToLocalStorage({conversion_rates}) {
    localStorage.setItem('conversionRates', JSON.stringify(conversion_rates));
    localStorage.setItem('haveData', JSON.stringify(true));

    fillSelectOptions();
}

function fillSelectOptions() {
    const conversionRates = JSON.parse(localStorage.getItem('conversionRates'));

    for (let cur in conversionRates) {
        upSelect.insertAdjacentHTML('beforeend', `
            <option value="${conversionRates[cur]}">${cur}</option>
        `);
        lowSelect.insertAdjacentHTML('beforeend', `
            <option value='${conversionRates[cur]}'>${cur}</option>
        `);   
    }

    setValueOptionForSelect(lowSelect,'.lower_exchange option', 'EUR');
    calculateResult();
}

function updateLowSelect({conversion_rates}) {
    lowSelect.innerHTML = '';

    for (let cur in conversion_rates) {   
        lowSelect.insertAdjacentHTML('beforeend', `
            <option value='${conversion_rates[cur]}'>${cur}</option>
        `); 
    }

    setValueOptionForSelect(lowSelect, '.lower_exchange option', selectedOptionLow); 
    calculateResult(); 
}

function calculateResult() {
    divOutResult.innerHTML = lowSelect.value * upInput.value;
}

function saveValueOption(element) {
    return element.selectedOptions[0].innerHTML;
}

function setValueOptionForSelect(element, items, local) {
    const optionsSelect = document.querySelectorAll(items);

    [...optionsSelect].forEach((option, index) => {
        if (option.innerHTML == local) {
            element.selectedIndex = index;
        }
    }); 
}

function buttonSwapSelectCurrency() {
    selectedOptionUp = saveValueOption(lowSelect);
    selectedOptionLow = saveValueOption(upSelect);
    setValueOptionForSelect(upSelect, '.up_exchange option', selectedOptionUp);
    getExchangeRateServer(url, selectedOptionUp, updateLowSelect);
}

lowSelect.addEventListener('change', () => {
    selectedOptionLow = saveValueOption(lowSelect);
    calculateResult();
});

upSelect.addEventListener('change', () => {
    selectedOptionUp = saveValueOption(upSelect);
    getExchangeRateServer(url, selectedOptionUp, updateLowSelect);
});

upInput.addEventListener('change', calculateResult);

buttonSwapSelect.addEventListener('click', buttonSwapSelectCurrency);

checkFirstStart();