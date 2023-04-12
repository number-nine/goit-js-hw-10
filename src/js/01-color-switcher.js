
let intervaiId = null;

const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

setButtonsAvailability();

refs.startBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!intervaiId) {
        intervaiId = setInterval(startColorize, 1000);
        setButtonsAvailability();
    }
})

refs.stopBtn.addEventListener('click', () => { 
    if (intervaiId) {
        clearInterval(intervaiId);
        intervaiId = null;
        document.body.style.backgroundColor = '#ffffff';
        setButtonsAvailability();
    }
});

function setButtonsAvailability() {
  refs.startBtn.disabled = intervaiId;
  refs.stopBtn.disabled = !intervaiId;
}

function startColorize() {
    document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}


