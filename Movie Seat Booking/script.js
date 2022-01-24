const out = document.querySelector('.out');
const room = document.querySelector('.room');
const select = document.querySelector('select');
const seats = document.querySelectorAll('.row .point:not(.point-occupied)');

populateUI();

let ticketPrice = +select.value;


function toLocalSelect() {
    const selectSeats = document.querySelectorAll('.room .point-selected');
    const allSeats = [...seats];

    const indexSelectSeats = [...selectSeats].map(item => {
        return allSeats.indexOf(item);
    });

    localStorage.setItem('selectSeats', JSON.stringify(indexSelectSeats));

    const selectSeatsLength = selectSeats.length;

    populateOut(selectSeatsLength);
}

function populateUI() {
    const localSelectSeats = JSON.parse(localStorage.getItem('selectSeats'));
    
    if (localSelectSeats != null && localSelectSeats.length > 0) {
        seats.forEach((item,index) => {
            if (localSelectSeats.includes(index)) {
                item.classList.toggle('point-selected');
            }
        });
    }

    const localMovieIndex = +(localStorage.getItem('selectedMovieIndex'));

    if (localMovieIndex != null) {
        select.selectedIndex = localMovieIndex;
    }
}

room.addEventListener('click', e => {
    const target = e.target;

    if (target && target.classList.contains('point') && !target.classList.contains('point-occupied')) {
        target.classList.toggle('point-selected');
        toLocalSelect();
    }

});

function setMovieData(movieIndex) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
}

select.addEventListener('change', e => {
    const target = e.target;
    ticketPrice = +target.value;

    setMovieData(target.selectedIndex);
    toLocalSelect();
})

function populateOut(value) {
    out.innerHTML = `You have selected ${value} seats for a price of $${value * ticketPrice}`;
}

toLocalSelect();