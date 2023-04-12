import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector('.form [name="delay"]'),
  stepEl: document.querySelector('.form [name="step"]'),
  amountEl: document.querySelector('.form [name="amount"]'),
  submitEl: document.querySelector('.form .submit'),
  randomEl: document.querySelector('.form .random'),
};

refs.formEl.addEventListener('submit', e => {
  e.preventDefault();
  if (!e.currentTarget === refs.formEl) {
    return;
  }

  //Disable button
  refs.submitEl.disabled = true;

  const promises = createPromisesCollection(
    refs.delayEl.valueAsNumber,
    refs.stepEl.valueAsNumber,
    refs.amountEl.valueAsNumber
  );

  promises.map(processingPromisesResults);

  //Enable button
  Promise.allSettled(promises).then(() => {
    refs.submitEl.disabled = false;
  });
});

refs.randomEl.addEventListener('click', randomizeValues);

function randomizeValues() {
  const shouldResolve = Math.random() > 0.3;
  refs.delayEl.value = Math.floor(Math.random() * 1000 + 500);
  refs.stepEl.value = Math.floor(Math.random() * 500 + 200);
  refs.amountEl.value = Math.floor(Math.random() * 10 + 2);
}

function processingPromisesResults(promise) {
  promise
    .then(({ position, delay }) =>
      Notify.success(`✅ Fulfilled promise ${position + 1} in ${delay}ms`)
    )
    .catch(({ position, delay }) =>
      Notify.failure(`❌ Rejected promise ${position + 1} in ${delay}ms`)
    );
}

function createPromisesCollection(basicDelay, step, amount) {
  const promises = [];
  for (let position = 0; position < amount; position += 1) {
    const currentDelay = basicDelay + step * position;
    promises.push(createPromise(position, currentDelay));
  }
  return promises;
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
