// ba348d21d81d11096752af13
const upSelect = document.querySelector('#up');
const lowSelect = document.querySelector('#low');
const upInput = document.querySelector('#up_input');
const divOutResult = document.querySelector('#low_input');
const buttonSwapSelect = document.querySelector('#button');
const url = 'https://v6.exchangerate-api.com/v6/ba348d21d81d11096752af13/latest/';

function checkFirstStart() {
    const haveData = JSON.parse(localStorage.getItem('haveData'));

    if (!haveData) {
        fetch(url + 'USD')
            .then(result => {
                return result.json();
            })
            .then(data => {
                setExchangeRateToLocalStorage(data);
            });   
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
            <option value="${cur}">${cur}</option>
        `);
        lowSelect.insertAdjacentHTML('beforeend', `
            <option value='${cur}'>${cur}</option>
        `); 
    }
    lowSelect.value = 'EUR';
    calculate();
}

function calculate() {
    const upSelectValue = upSelect.value;
    const lowSelectValue = lowSelect.value;

    fetch(url + upSelectValue)
        .then(result => {
            return result.json();
        })
        .then(data => {
            const rate = data['conversion_rates'][lowSelectValue];
            divOutResult.textContent = (upInput.value * rate).toFixed(2);
        });
}

function buttonSwapSelectCurrency() {
    const upSelectValue = upSelect.value;
    upSelect.value = lowSelect.value;
    lowSelect.value = upSelectValue;
    calculate();
}

lowSelect.addEventListener('change', calculate);
upSelect.addEventListener('change', calculate);
upInput.addEventListener('change', calculate);
buttonSwapSelect.addEventListener('click', buttonSwapSelectCurrency);

checkFirstStart();