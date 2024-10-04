class Stack {
    #top;
    #maxNumber;
    #elements;

    constructor(maxNumber = 10) {
        if (!Number.isInteger(maxNumber) || maxNumber < 0) {
            throw TypeError(`${maxNumber} is not a valud number`);
        }
        
        this.#top = 0;
        this.#maxNumber = maxNumber;
        this.#elements = [];
    }

    push(elem) {
        if (this.#top === this.#maxNumber) {
            throw Error('Stack is full');
        }

        this.#elements[this.#top++] = elem;
    }

    pop() {
        if (this.isEmpty()) {
            throw Error('Stack is empty');
        }

        return this.#elements[--this.#top];
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        } else {
            return this.#elements[this.#top - 1];
        }
    }

    isEmpty() {
        return this.#top === 0;
    }

    toArray() {
        return this.#elements.slice();
    }

    static fromIterable(iterable) {
        if (!iterable || typeof iterable[Symbol.iterator] !== 'function') {
            throw new TypeError(`${iterable} is not iterable`);
        }

        const newStack = new Stack(iterable.length);
        
        for (const elem of iterable) {
            newStack.push(elem);
        }

        return newStack;
    }
}