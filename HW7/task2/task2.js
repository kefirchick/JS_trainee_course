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
        if (this._time === 3600) {
            this.stop();
        }

        this._time++;
        this._display.printTime(this._time);
    }
}

const stopwatch = new StopwatchController()

document.addEventListener('click', (event) => {
    switch (event.target.id) {
        case 'set-timer': setTimer();
        break;
        case 'reset-timer': resetTimer();
        break;
        case 'start-stopwatch': stopwatch.start();
        break;
        case 'pause-stopwatch': stopwatch.stop();
        break;
        case 'reset-stopwatch': stopwatch.reset();
        break;
    }
})

function setTimer() {
    console.log('setTimer');
}

function resetTimer() {
    console.log('resetTimer');
}

function startStopwatch() {
    console.log('startStopwatch');
}

function pauseStopwatch() {
    console.log('pauseStopwatch');
}

function resetStopwatch() {
    console.log('resetStopwatch');
}
