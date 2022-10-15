const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

window.onload = onLoadPage();

refs.startBtn.addEventListener('click', onClickStartBtn);
refs.stopBtn.addEventListener('click', onClickStopBtn);

let coloringIntervalId = null;

function onLoadPage() {
  refs.stopBtn.disabled = true;
}

function onClickStartBtn() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;

  coloringIntervalId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClickStopBtn() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;

  clearInterval(coloringIntervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
