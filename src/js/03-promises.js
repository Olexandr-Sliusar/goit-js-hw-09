import { Notify } from 'notiflix/build/notiflix-notify-aio';

Notify.init({
  timeout: 5000,
  clickToClose: true,
});

const refs = {
  form: document.querySelector('.form'),
  formSubmitBtn: document.querySelector('.form button'),
};

const frm = refs.form.elements;

window.onload = onLoadPage();
refs.form.addEventListener('submit', onSubmitFormEvent);

function onLoadPage() {
  /* set default value */
  frm.delay.value = 1000;
  frm.step.value = 500;
  frm.amount.value = 5;
}

function onSubmitFormEvent(event) {
  event.preventDefault();

  let delay = Number(frm.delay.value);

  for (let i = 1; i <= Number(frm.amount.value); i += 1) {
    createPromise(i, delay).then(onSuccess).catch(onFailure);
    delay += Number(frm.step.value);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSuccess({ position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
}

function onFailure({ position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
}
