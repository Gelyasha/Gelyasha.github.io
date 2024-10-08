import { Progress } from "./progress.js";

const container = document.querySelector('#progress');

const numberInput = document.querySelector('#numberInput');
const animateControl = document.querySelector('#animateControl');
const hideControl = document.querySelector('#hideControl');

const progress = new Progress();

progress.render(container);

numberInput.addEventListener('change', (event) => {
    progress.value = +event.target.value;
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
