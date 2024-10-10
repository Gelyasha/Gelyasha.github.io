import { Progress } from "./progress.js";

const container = document.querySelector('#progress');

const numberInput = document.querySelector('#numberInput');
const animateControl = document.querySelector('#animateControl');
const hideControl = document.querySelector('#hideControl');

const progress = new Progress();

progress.render(container);

const trimStartZeros = (str) => {
    if (str.startsWith('0') && str.length > 1) {
        const res = str.slice(1, str.length);
        return trimStartZeros(res)
    }
    return str;
}

numberInput.addEventListener('input', (event) => {
    event.target.value = trimStartZeros(event.target.value);
    if (+event.target.value < 0) {
        event.target.value = 0;
    }
    if (+event.target.value > 100) {
        event.target.value = 100
    }

    progress.value = +event.target.value;
})

numberInput.addEventListener('beforeinput', (event) => {
    if (event.data && !/[0-9]/.test(event.data)) {
        event.preventDefault()
    }
})

animateControl.addEventListener('change', (event) => {
    const isHidden = hideControl.checked;

    if (isHidden) {
        return
    }

    const isChecked = event.target.checked;

    if (isChecked) {
        progress.mode = 'animated'
    } else {
        progress.mode = 'normal'
    }
});

hideControl.addEventListener('change', (event) => {
    const isChecked = event.target.checked;

    if (isChecked) {
        progress.mode = 'hidden';
        return;
    }

    const isAnimated = animateControl.checked;

    if (isAnimated) {
        progress.mode = 'animated'
    } else {
        progress.mode = 'normal'
    }
})
