import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';


let timerID = null;
const input = document.querySelector('#datetime-picker');
const start = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');
const timer = document.querySelector('.timer');
const numbers = document.querySelectorAll('.value');
const timerSections = document.querySelectorAll('.field');
let selDate;


timer.style.marginTop = '50px';
timer.style.display = 'flex';
timer.style.flexDirection = 'row';

for (const section of timerSections) {
  section.style.display = 'flex';
  section.style.flexDirection = 'column';
  section.style.alignItems = 'center';
  section.style.marginRight = '10px';
}

for (const number of numbers) {
  number.style.fontSize = '40px';
}


start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,


  onClose(selectedDates) {
    const dateCurrent = new Date();
    selDate = selectedDates[0];
    if (selectedDates[0].getTime() - dateCurrent.getTime() <= 0) {
      Notiflix.Notify.failure('Please choose a date in the future');
      start.disabled = true;
    } else {
      start.disabled = false;
    }
  },
};


flatpickr(input, options);


start.addEventListener('click', timerInitializer);
stop.addEventListener('click', timerDestructor);


function timerInitializer() {
  start.disabled = true;
  timerID = setInterval(() => {
    const dateCurrent = new Date();
    const ms = selDate.getTime() - dateCurrent.getTime();


    if (ms <= 0) {
      timerDestructor();
    } else {

      const timerTotal = convertMs(ms);
      days.textContent = `${addLeadingZero(timerTotal.days)}`;
      hours.textContent = `${addLeadingZero(timerTotal.hours)}`;
      minutes.textContent = `${addLeadingZero(timerTotal.minutes)}`;
      seconds.textContent = `${addLeadingZero(timerTotal.seconds)}`;
    }
  }, 1000);
}


function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


function timerDestructor() {
  start.disabled = false;
  clearInterval(timerID);
  days.textContent = '00';
  hours.textContent = '00';
  minutes.textContent = '00';
  seconds.textContent = '00';
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
