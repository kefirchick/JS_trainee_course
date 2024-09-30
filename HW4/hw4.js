class Calculator {
    #valX;
    #valY;

    constructor(valX, valY) {
        this.setX = valX;
        this.setY = valY;
    }

    set setX(valX) {
        this.validate(valX);
        this.#valX = valX;
    }

    set setY(valY) {
        this.validate(valY);
        this.#valY = valY;
    }

    validate(value) {
        if ( typeof value !== 'number' || Number.isNaN(value) ) {
            throw TypeError(`${value} is not a number`)
        }

        if ( !Number.isFinite(value) ) {
            throw RangeError(`${value} should be finite`)
        }
    }

    logSum = () => {
        return this.#valX + this.#valY;
    }

    logMul = () => {
        return this.#valX * this.#valY;
    }

    logSub = () => {
        return this.#valX - this.#valY;
    }

    logDiv = () => {
        if (this.#valY === 0) {
            throw Error('Division by 0');
        } 

        return this.#valX / this.#valY;
    }
}