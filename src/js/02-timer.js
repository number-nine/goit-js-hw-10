import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.6.min.css';

let timeRange = 0;
let intervalId = null;

const refs = {
  dateSelectorEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    initTimeRange(selectedDates[0]);
    initCounter(timeRange);
  },
};

const dateInst = flatpickr(refs.dateSelectorEl, options);

initTimeRange(dateInst.selectedDates[0]);
initCounter(timeRange);
refs.startBtnEl.addEventListener('click', counter);

function counter() {
  if (!intervalId) {
    refs.dateSelectorEl.disabled = true;
    refs.startBtnEl.textContent = 'Stop';
    intervalId = setInterval(() => {
      timeRange -= 1000;
      initCounter(timeRange);
      if (timeRange === 0) {
        stopCounter();
        initTimeRange(dateInst.selectedDates[0]);
        return;
      }
      
    }, 1000);
  } else {
    stopCounter();
  }
}

function stopCounter() {
  clearInterval(intervalId);
  intervalId = null;
  refs.dateSelectorEl.disabled = false;
  refs.startBtnEl.textContent = 'Start';
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function initTimeRange(date) {
  const startDate = Date.now();
  let crudeTimeRange = Math.trunc((date - startDate)/1000)*1000;
  if (crudeTimeRange > 0) {
    timeRange = crudeTimeRange > 8639999000 ? 8639999000 : crudeTimeRange;
    refs.startBtnEl.disabled = false;
    refs.dateSelectorEl.style.borderColor = 'unset';
    return;
  }
  timeRange = 0;
  refs.startBtnEl.disabled = true;
  refs.dateSelectorEl.style.borderColor = '#ff0000';
  Notify.failure('Please choose a date in the future');
}

function initCounter(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(unit) {
  return unit.toString().padStart(2, '0');
}
