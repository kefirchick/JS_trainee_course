class TimeDisplay{
    constructor(displayElement) {
        this._displayElement = displayElement;
    }

    printTime(time) {
        const min = Math.floor(time / 60);
        const sec = time % 60;
        const minStr = this.toTwoDigits(min);
        const secStr = this.toTwoDigits(sec);
        this._displayElement.textContent = `${minStr}:${secStr}`;
    }

    toTwoDigits(number) {
        return number.toString().padStart(2, '0');
    }
}

class StopwatchController {
    constructor() {
        const displayElement = document.getElementById('stopwatch-value');
        this._display = new TimeDisplay(displayElement);
        this._time = 0;
        this._timerId = null;
    }

    start() {
        if (!this._timerId) {
            this._timerId = setInterval(() => {
                this.tick();
            }, 1000)
        }
    }

    stop() {
        clearInterval(this._timerId);
        this._timerId = null;
    }

    reset() {
        this.stop();
        this._time = 0;
        this._display.printTime(this._time);
    }

    tick() {
        if (this._time === 3599) {
            this.stop();
        }

        this._time++;
        this._display.printTime(this._time);
    }
}

class InputHandler {
    constructor(inputElement) {
        this._inputElement = inputElement;
        this._lastValue = 0;
        inputElement.value = 0;
        inputElement.addEventListener('input', () => {
            this.checkInput();
        });
    }

    checkInput() {
        const inputText = this._inputElement.value;
        const inputValue = Number(inputText);

        if (this.isValid(inputValue)) {
            this._lastValue = inputValue;
        } else {
            this._inputElement.value = this._lastValue;
        }
    }

    isValid(number) {
        return Number.isInteger(number) && number >= 0 && number < 60;
    }

    getValue() {
        return this._lastValue;
    }

    reset() {
        this._lastValue = 0;
        this._inputElement.value = 0;
    }
}

class TimerController {
    constructor() {
        const displayElement = document.getElementById('timer-value');
        this._display = new TimeDisplay(displayElement);
        const inputMin = document.getElementById('input-minutes');
        this._minHandler = new InputHandler(inputMin);
        const inputSec = document.getElementById('input-seconds');
        this._secHandler = new InputHandler(inputSec);
        this._time = 0;
        this._timerId = null;
    }

    setTimer() {
        this._time = this._minHandler.getValue() * 60 + this._secHandler.getValue();
        this._display.printTime(this._time);

        if (!this._timerId) {
            this._timerId = setInterval(() => {
                this.tick();
            }, 1000)
        }
    }

    tick() {
        if (this._time === 0) {
            this.clearTimer();
        } else {
            this._time--;
            this._display.printTime(this._time);
        }
    }

    reset() {
        this.clearTimer();
        this._time = 0;
        this._display.printTime(this._time);
        this._minHandler.reset();
        this._secHandler.reset();
    }

    clearTimer() {
        clearInterval(this._timerId);
        this._timerId = null;
    }
}

const timer = new TimerController();
const stopwatch = new StopwatchController();

document.addEventListener('click', (event) => {
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
})