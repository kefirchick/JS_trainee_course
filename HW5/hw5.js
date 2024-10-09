class Node {
    #prev;
    #next;

    constructor(value, prev = null, next = null) {
        this.value = value;
        this.prev = prev;
        this.next = prev;
    }

    set prev(node) {
        if (!this.#isNodeValid(node)) {
            throw new Error(`${node} isn't a valid node`);
        }

        this.#prev = node;
    }

    get prev() {
        return this.#prev;
    }
    
    set next(node) {
        if (!this.#isNodeValid(node)) {
            throw new Error(`${node} isn't a valid node`);
        }

        this.#next = node;
    }

    get next() {
        return this.#next;
    }

    #isNodeValid(node) {
        return (node instanceof Node) || (node === null);
    }
}

class Stack {
    #top;
    #size;
    #maxSize;

    constructor(maxSize = 10) {
        if (!Number.isInteger(maxSize) || maxSize < 0) {
            throw new Error(`${maxSize} is not a valid number`);
        }
        
        this.#top = null;
        this.#size = 0;
        this.#maxSize = maxSize;
    }

    push(value) {
        if (this.#size === this.#maxSize) {
            throw new Error('Stack is full');
        }

        this.#size++;
        this.#top = new Node(value, this.#top);
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error('Stack is empty');
        }
        
        this.#size--;
        const topValue = this.#top.value;
        this.#top = this.#top.prev;

        return topValue;
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        } else {
            return this.#top.value;
        }
    }

    isEmpty() {
        return this.#size === 0;
    }

    toArray() {
        const array = [];
        
        let pos = this.#top;
        while (pos) {
            array.push(pos.value);
            pos = pos.prev;
        }

        return array.reverse().slice();
    }

    static fromIterable(iterable) {
        if (!iterable || typeof iterable[Symbol.iterator] !== 'function') {
            throw new Error(`${iterable} is not iterable`);
        }

        const newStack = new Stack(iterable.length);
        
        for (const elem of iterable) {
            newStack.push(elem);
        }

        return newStack;
    }
}