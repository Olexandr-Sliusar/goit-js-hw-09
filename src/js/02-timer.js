import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/material_orange.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputTimeEl: document.querySelector('input#datetime-picker'),
  buttonStartEl: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('.value[data-days]'),
  hoursEl: document.querySelector('.value[data-hours]'),
  minutesEl: document.querySelector('.value[data-minutes]'),
  secondsEl: document.querySelector('.value[data-seconds]'),
};

const { inputTimeEl, buttonStartEl, daysEl, hoursEl, minutesEl, secondsEl } =
  refs;

let timerIsActive = false;
let timerDateFinish = {};

Notify.init({
  timeout: 5000,
  clickToClose: true,
  position: 'right-bottom',
});

buttonStartEl.disabled = true;
buttonStartEl.addEventListener('click', onClickStartTimer);

const options = {
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (timerIsActive) {
      Notify.warning('Please wait until the timer ends or refresh the page');
      return false;
    }
    let intervalMs = 0;
    if (checkDate(selectedDates[0])) {
      timerDateFinish = selectedDates[0];
      intervalMs = timerDateFinish - new Date();
      printInterval(intervalMs);
    }
    printInterval(intervalMs);
  },
};

function checkDate(selectedDates) {
  if (new Date() < selectedDates) {
    buttonStartEl.disabled = false;
    return true;
  }
  buttonStartEl.disabled = true;
  Notify.failure('Please, choose date in the future');
  return false;
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

const addLeadingZero = value => value.toString().padStart(2, '0');

function printInterval(intervalMs) {
  let intervalObj = convertMs(intervalMs);
  const { days, hours, minutes, seconds } = intervalObj;

  daysEl.textContent = days > 10 ? days : addLeadingZero(days);
  hoursEl.textContent = hours > 10 ? hours : addLeadingZero(hours);
  minutesEl.textContent = minutes > 10 ? minutes : addLeadingZero(minutes);
  secondsEl.textContent = seconds > 10 ? seconds : addLeadingZero(seconds);
}

function onClickStartTimer() {
  if (checkDate(timerDateFinish)) {
    buttonStartEl.disabled = true;
    timerIsActive = true;
    let intervalMs = timerDateFinish - new Date();
    printInterval(intervalMs);
    const timer = setInterval(() => {
      intervalMs -= 1000;
      printInterval(intervalMs);
      if (intervalMs < 1000) {
        clearInterval(timer);
        Notify.success('Time is over');
        timerIsActive = false;
      }
    }, 1000);
    return;
  }
  printInterval(0);
}

flatpickr(inputTimeEl, options);
