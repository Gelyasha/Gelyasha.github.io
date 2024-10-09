
export class Progress {
    #value = 0;
    #container = null;
    #mode = 'normal';
    #DEGREES_PER_PERCENT = 360 / 100;
    #AVAILABLE_MODES = ['normal', 'animated', 'hidden'];

    constructor(initialValue) {
        if (initialValue) {
            const isCorrect = this.#checkValue(initialValue);
            if (isCorrect) {
                this.#value = initialValue;
            }
        }
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
            const wrapper = this.#container.querySelector('#container');
            switch (value) {
                case 'normal': {
                    wrapper.style.display = 'block';
                    wrapper.classList.remove('animating')
                    this.#rotateLoader(this.#value);
                    break;
                }
                case 'animated': {
                    wrapper.style.display = 'block';
                    wrapper.classList.add('animating');
                    wrapper.classList.remove('full');
                    wrapper.classList.remove('empty');
                    break;
                }
                case 'hidden': {
                    wrapper.style.display = 'none';
                    wrapper.classList.remove('animating');

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
        const outerBlock = document.createElement('div');

        wrapper.classList.add('container');
        wrapper.setAttribute('id', 'container');
        rightBlock.classList.add('right');
        leftBlock.classList.add('left');
        rotateBlock.classList.add('rotate');
        rotateBlock.setAttribute('id', 'rotate');
        centerBlock.classList.add('center');
        outerBlock.classList.add('outer');

        wrapper.append(rightBlock, leftBlock, rotateBlock, centerBlock, outerBlock);
        container.appendChild(wrapper);

        this.#container = container;

        this.#rotateLoader(this.#value);
    }

    #rotateLoader(percent) {
        if (this.#container) {
            const loader = this.#container.querySelector('#rotate');
            const wrapper = this.#container.querySelector('#container');

            if (percent < 51) {
                const deg = percent * this.#DEGREES_PER_PERCENT;
                loader.style.transform = `rotate(${deg}deg)`;
                loader.style.backgroundColor = '#F4F7FA';

                wrapper.classList.remove('full')
                if (percent === 0) {
                    wrapper.classList.add('empty')
                } else {
                    wrapper.classList.remove('empty')
                }

            } else {
                const deg = (percent - 50) * this.#DEGREES_PER_PERCENT;
                loader.style.transform = `rotate(${deg}deg)`;
                loader.style.backgroundColor = '#276CFF';

                wrapper.classList.remove('empty')
                if (percent === 100) {
                    wrapper.classList.add('full')
                } else {
                    wrapper.classList.remove('full')
                }
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
