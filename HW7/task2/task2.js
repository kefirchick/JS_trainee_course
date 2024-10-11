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
        this._lastValue = 59;
        inputElement.value = 59;
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
}

const input = document.getElementById('input-minutes');
const inputHandler = new InputHandler(input);

// class TimerController {
//     constructor() {
//         const displayElement = document.getElementById('timer-value');
//         this._display = new TimeDisplay(displayElement);
//         this._time = 0;
//         this._timerId = null;
//         this._inputMin = document.getElementById('timer-value');
//         this._inputSec = document.getElementById('timer-value');
//         this._inputMinValue = 60;
//         this._inputSecValue = 00;
//     }

//     handleInputMin() {
//         const inputText = this._inputMin.textContent;
//         const inputValue = Number(inputText);
        
//         if (Number.isInteger(inputText) && inputValue >= 0 && inputValue <= 60) {
//             this._inputMinValue = 
//         }
//     }
// }



const stopwatch = new StopwatchController();

document.addEventListener('click', (event) => {
    switch (event.target.id) {
        case 'timer-set': setTimer();
        break;
        case 'timer-reset': resetTimer();
        break;
        case 'stopwatch-start': stopwatch.start();
        break;
        case 'stopwatch-pause': stopwatch.stop();
        break;
        case 'stopwatch-reset': stopwatch.reset();
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
