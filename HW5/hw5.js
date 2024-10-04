class Stack {
    #top;
    #maxNumber;
    #elements;

    constructor(maxNumber = 10) {
        if (!Number.isInteger(maxNumber) || maxNumber < 0) {
            throw TypeError(`${value} is not a valud number`);
        }
        
        this.#top = 0;
        this.#maxNumber = maxNumber;
        this.#elements = new Array();
    }

    push = (elem) => {
        if (this.#top === this.#maxNumber) {
            throw Error('Stack is full');
        }

        this.#elements[this.#top++] = elem;
    }

    pop = () => {
        if (this.isEmpty()) {
            throw Error('Stack is empty');
        }

        return this.#elements[--this.#top];
    }

    peek = () => {
        if (this.isEmpty()) {
            return null;
        } else {
            return this.#elements[this.#top - 1];
        }
    }

    isEmpty = () => {
        return this.#top === 0;
    }

    toArray = () => {
        return this.#elements;
    }

    static fromIterable = (iterable) => {
        const newStack = new Stack(iterable.length);
        
        for (const elem of iterable) {
            newStack.push(elem);
        }

        return newStack;
    }
}