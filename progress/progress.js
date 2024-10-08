
export class Progress {
    #value = 0;
    #container = null;
    #mode = 'normal';
    #DEGREES_PER_PERCENT = 360 / 100;
    #AVAILABLE_MODES = ['normal', 'animated', 'hidden'];

    constructor() {

    };

    get value() {
        return this.#value;
    };

    set value(value) {
        const isCorrect = this.#checkValue(value);
        if (isCorrect) {
            this.#value = value;

            if (this.#mode === 'normal') {
                this.#rotateLoader(value);
            }
        }
    };

    set mode(value) {
        if (this.#AVAILABLE_MODES.includes(value)) {
            this.#mode = value;
            switch (value) {
                case 'normal': {
                    const element = this.#container.querySelector('#container');
                    element.style.display = 'block';
                    element.classList.remove('animating')
                    this.#rotateLoader(this.#value);
                    break;
                }
                case 'animated': {
                    const element = this.#container.querySelector('#container');
                    element.style.display = 'block';
                    element.classList.add('animating')
                    break;
                }
                case 'hidden': {
                    const element = this.#container.querySelector('#container');
                    element.style.display = 'none';
                    element.classList.remove('animating');
                    
                    break;
                }
                default: break;
            }
        } else {
            console.log('unexpected mode value')
        }
    }

    render(container) {
        const wrapper = document.createElement('div');
        const rightBlock = document.createElement('div');
        const leftBlock = document.createElement('div');
        const rotateBlock = document.createElement('div');
        const centerBlock = document.createElement('div');

        wrapper.classList.add('container');
        wrapper.setAttribute('id', 'container');
        rightBlock.classList.add('right');
        leftBlock.classList.add('left');
        rotateBlock.classList.add('rotate');
        rotateBlock.setAttribute('id', 'rotate');
        centerBlock.classList.add('center');

        wrapper.append(rightBlock, leftBlock, rotateBlock, centerBlock);
        container.appendChild(wrapper);

        this.#container = container;
    }

    #rotateLoader(percent) {
        if (this.#container) {
            const loader = this.#container.querySelector('#rotate');

            if (percent < 51) {
                const deg = percent * this.#DEGREES_PER_PERCENT;
                loader.style.transform = `rotate(${deg}deg)`;
                loader.style.backgroundColor = '#F4F7FA';
            } else {
                const deg = (percent - 50) * this.#DEGREES_PER_PERCENT;
                loader.style.transform = `rotate(${deg}deg)`;
                loader.style.backgroundColor = '#276CFF';
            }
        }
    }

    #checkValue(value) {
        if (typeof value !== 'number') {
            console.log('incorrect type')
            return false
        }
        if (value < 0 || value > 100) {
            console.log('out of range')
            return false
        }
        return true
    }
}
