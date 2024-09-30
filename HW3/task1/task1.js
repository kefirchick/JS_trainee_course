const obj = {
    set from(value) {
        const number = numberConvert(value);
        this._from = number;
    },

    set to(value) {
        const number = numberConvert(value);
        this._to = number;
    },

    [Symbol.iterator]() {
        if (this._to < this._from) {
            throw new Error(`${this._to} is less than ${this._from}`);
        }

        this._current = this._from;

        return this;
    },

    next() {
        if (this._current <= this._to) {
            return {
                done: false,
                value: this._current++
            }
        } else {
            return {
                done: true
            }
        }
    }
}

function numberConvert(value) {
    const number = Number(value);

    if (isNaN(number)) {
        throw new TypeError(`${value} is not a number`);
    }

    return number;
}

obj.from = prompt('Specify the count start number:', '0');
obj.to = prompt('Specify the count end number:', '5');

for (const item of obj) {
    alert(item);
}