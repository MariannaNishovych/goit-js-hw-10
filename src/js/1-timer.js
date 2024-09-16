'use strict';  

import flatpickr from "flatpickr";  
import "flatpickr/dist/flatpickr.min.css";  
import iziToast from "izitoast";  
import "izitoast/dist/css/iziToast.min.css";  

const inputData = document.querySelector('#datetime-picker');  
const startBtn = document.querySelector('button[data-start]');  

const timerElements = {  
  days: document.querySelector('span[data-days]'),  
  hours: document.querySelector('span[data-hours]'),  
  minutes: document.querySelector('span[data-minutes]'),  
  seconds: document.querySelector('span[data-seconds]')  
};  

let timer;  
let selectedDate = null;  

const options = {  
  enableTime: true,  
  time_24hr: true,  
  defaultDate: new Date(),  
  minuteIncrement: 1,  
  onClose(selectedDates) {  
    const isDateInPast = new Date().getTime() > selectedDates[0].getTime();  
    if (isDateInPast) {  
      showError('Please choose a date in the future');  
    } else {  
      selectedDate = selectedDates[0];  
      startBtn.disabled = false;  
    }  
  }  
};  

startBtn.addEventListener('click', () => {  
  if (selectedDate) {  
    startBtn.disabled = true;  
    timer = setInterval(updateTimer, 1000);  
  }  
});  

function updateTimer() {  
  const difference = selectedDate.getTime() - new Date().getTime();  
  if (difference < 1000) {  
    clearInterval(timer);  
    timerElements.seconds.textContent = '00';  
  } else {  
    const { days, hours, minutes, seconds } = convertMs(difference);  
    updateTimerElements(days, hours, minutes, seconds);  
  }  
}  

function updateTimerElements(days, hours, minutes, seconds) {  
  timerElements.days.textContent = addZero(days);  
  timerElements.hours.textContent = addZero(hours);  
  timerElements.minutes.textContent = addZero(minutes);  
  timerElements.seconds.textContent = addZero(seconds);  
}  

function convertMs(ms) {  
  const second = 1000;  
  const minute = second * 60;  
  const hour = minute * 60;  
  const day = hour * 24;  

  return {  
    days: Math.floor(ms / day),  
    hours: Math.floor((ms % day) / hour),  
    minutes: Math.floor(((ms % day) % hour) / minute),  
    seconds: Math.floor((((ms % day) % hour) % minute) / second)  
  };  
}  

function addZero(value) {  
  return value.toString().padStart(2, '0');  
}  

function showError(message) {  
  iziToast.error({  
    title: 'Error',  
    message,  
    position: 'topRight',  
    color: '#ef4040',  
    titleColor: '#fff',  
    titleSize: '16px',  
    titleLineHeight: '150%',  
    messageColor: '#fff',  
    messageSize: '16px',  
    messageLineHeight: '150%'  
  });  
}  

flatpickr(inputData, options);  