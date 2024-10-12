const SEC_PER_MIN = 60;
const MAX_TIME = 3599;

class TimeDisplay{
    #displayElement;
    
    constructor(displayElement) {
        this.#displayElement = displayElement;
    }

    printTime(time) {
        const min = Math.floor(time / SEC_PER_MIN);
        const sec = time % SEC_PER_MIN;
        const minStr = this.toTwoDigits(min);
        const secStr = this.toTwoDigits(sec);
        this.#displayElement.textContent = `${minStr}:${secStr}`;
    }

    toTwoDigits(number) {
        return number.toString().padStart(2, '0');
    }
}

class StopwatchController {
    #display;
    #time;
    #timerId;

    constructor() {
        const displayElement = document.getElementById('stopwatch-value');
        this.#display = new TimeDisplay(displayElement);
        this.#time = 0;
        this.#timerId = null;
    }

    start() {
        if (!this.#timerId) {
            this.#timerId = setInterval(() => {
                this.tick();
            }, 1000)
        }
    }

    stop() {
        clearInterval(this.#timerId);
        this.#timerId = null;
    }

    reset() {
        this.stop();
        this.#time = 0;
        this.#display.printTime(this.#time);
    }

    tick() {
        if (this.#time === MAX_TIME) {
            this.stop();
        }

        this.#time++;
        this.#display.printTime(this.#time);
    }
}

class InputHandler {
    #inputElement;
    #lastValue;

    constructor(inputElement) {
        this.#inputElement = inputElement;
        this.#lastValue = 0;
        inputElement.value = 0;
        inputElement.addEventListener('input', () => {
            this.checkInput();
        });
    }

    checkInput() {
        const inputText = this.#inputElement.value;
        const inputValue = Number(inputText);

        if (this.isValid(inputValue)) {
            this.#lastValue = inputValue;
        } else {
            this.#inputElement.value = this.#lastValue;
        }
    }

    isValid(number) {
        return Number.isInteger(number) && number >= 0 && number < SEC_PER_MIN;
    }

    getValue() {
        return this.#lastValue;
    }

    reset() {
        this.#lastValue = 0;
        this.#inputElement.value = 0;
    }
}

class TimerController {
    #display;
    #minHandler;
    #secHandler;
    #time;
    #timerId;

    constructor() {
        const displayElement = document.getElementById('timer-value');
        this.#display = new TimeDisplay(displayElement);
        const inputMin = document.getElementById('input-minutes');
        this.#minHandler = new InputHandler(inputMin);
        const inputSec = document.getElementById('input-seconds');
        this.#secHandler = new InputHandler(inputSec);
        this.#time = 0;
        this.#timerId = null;
    }

    setTimer() {
        this.#time = this.#minHandler.getValue() * SEC_PER_MIN + this.#secHandler.getValue();
        this.#display.printTime(this.#time);

        if (!this.#timerId) {
            this.#timerId = setInterval(() => {
                this.tick();
            }, 1000)
        }
    }

    tick() {
        if (this.#time === 0) {
            this.clearTimer();
        } else {
            this.#time--;
            this.#display.printTime(this.#time);
        }
    }

    reset() {
        this.clearTimer();
        this.#time = 0;
        this.#display.printTime(this.#time);
        this.#minHandler.reset();
        this.#secHandler.reset();
    }

    clearTimer() {
        clearInterval(this.#timerId);
        this.#timerId = null;
    }
}

function buttonsHandle(event) {
    switch (event.target.id) {
        case 'timer-set': timer.setTimer();
        break;
        case 'timer-reset': timer.reset();
        break;
        case 'stopwatch-start': stopwatch.start();
        break;
        case 'stopwatch-pause': stopwatch.stop();
        break;
        case 'stopwatch-reset': stopwatch.reset();
        break;
    }
}

const timer = new TimerController();
const stopwatch = new StopwatchController();
document.addEventListener('click', buttonsHandle);

