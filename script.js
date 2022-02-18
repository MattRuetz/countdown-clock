const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdown-form');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;


const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date input minimum (today) bound
const today = new Date().toISOString().split('T');


dateEl.setAttribute('min', today[0]);

const updateDOM = () => {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        
        //Hide Input
        inputContainer.hidden = true;
        countdownEl.hidden = false;
        //If countdown is over - show complete
        if(distance <= 0) {
            countdownEl.hidden = true;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
            completeEl.hidden = false;
        }
        else {
            // Populate Countdown
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElements[0].textContent = `${days}`;
            timeElements[1].textContent = `${hours}`;
            timeElements[2].textContent = `${minutes}`;
            timeElements[3].textContent = `${seconds}`;
            completeEl.hidden = true;
            countdownEl.hidden = false;
        }

    }, second);
}

const updateCountdown = (e) => {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    let savedCountdown = {
        title: countdownTitle,
        date: countdownDate
    }
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

    if(countdownDate === '') {
        alert("Please select a date for the countdown!")
    } else {
        // Get countdown date in MILLISECONDS
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

const reset = () => {
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countdownActive);
    //Reset public variables and clear local storage
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

const restorePrevCountdown = () => {
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

// Event Listener
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

//On Load: check local storage:
restorePrevCountdown();