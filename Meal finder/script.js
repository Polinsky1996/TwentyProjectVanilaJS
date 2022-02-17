'use strict';

const input = document.querySelector('#input');
const btnSearch = document.querySelector('#button__search');
const btnRandom = document.querySelector('#button__random');
const messageResult = document.querySelector('#result__information');
const containerResult = document.querySelector('#container__result');
const containerRecipe = document.querySelector('#container__recipe');


function displayResult() {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`).then((data) => {
        return data.json();
    }).then(({meals}) => {
        if (meals != null && input.value.trim() != '') {
            messageResult.innerHTML = `Search results for '${input.value}':`;
            containerResult.innerHTML = '';

            meals.forEach( item => {
                containerResult.insertAdjacentHTML('beforeend', `
                    <div class="result__card">
                        <div class="result__title">${item["strMeal"]}</div>
                        <img src="${item["strMealThumb"]}" alt="image">
                    </div>
                `);
            });
            containerResult.style = 'display: grid';    
        }
        else {
            messageResult.innerHTML = 'There are no search results. Try again!';
            containerResult.style = 'display: none';
        }
        
        containerRecipe.style = 'display: none';
    });
}

function getSelectedRecipe(strMeal) {
    fetch(strMeal)
    .then( data => data.json())
    .then( (meals) => {
        displaySelectedRecipe(meals);
    });
}

function displaySelectedRecipe(meals) {
    const recipeObject = meals['meals'][0];

    containerRecipe.querySelector('.recipe__title').innerHTML = recipeObject.strMeal;
    containerRecipe.querySelector('.recipe__image').innerHTML = `
        <img src="${recipeObject.strMealThumb}" alt="image-recipe">
    `
    containerRecipe.querySelector('.recipe__category').innerHTML = recipeObject.strCategory;
    containerRecipe.querySelector('.recipe__country').innerHTML = recipeObject.strArea;
    containerRecipe.querySelector('.recipe__inctruction').innerHTML = recipeObject.strInstructions.replace(/\\r|\\n/, '');

    const ingridients = containerRecipe.querySelector('.recipe__ingredients');
    ingridients.innerHTML = '';
    let i = 1;

    while(i <= 20) {
        const ingridient = recipeObject['strIngredient' + i];
        const measure = recipeObject['strMeasure' + i];
        if (ingridient.trim() === '') {
            break;
        }
        ingridients.innerHTML += `<span>${ingridient} - ${measure}</span>`;
        i++;
    }

    containerRecipe.style = 'display: flex';
}

containerResult.addEventListener('click', event => {
    const card = event.target;
    console.log(event.path);

    if (card && card.classList.contains('result__title')) {
        getSelectedRecipe(`https://www.themealdb.com/api/json/v1/1/search.php?s=${card.innerText}`);
    }
});


btnSearch.addEventListener('click', displayResult);

btnRandom.addEventListener('click', () => {
    getSelectedRecipe('https://www.themealdb.com/api/json/v1/1/random.php');
    messageResult.innerHTML = '';
    containerResult.style = 'display: none'; 
});