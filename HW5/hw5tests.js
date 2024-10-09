mocha.setup('bdd');
const ASSERT = chai.assert;

describe('class Stack', function() {
    const stack = new Stack(2);
    const emptyStack = new Stack(0);

    it('push', function() {
        stack.push(0);
        stack.push(1);
        ASSERT.throws(() => {
            stack.push(2);
        }, Error, 'Stack is full');
    });

    it(`isEmpty`, function() {
        ASSERT.equal(stack.isEmpty(), false);
        ASSERT.equal(emptyStack.isEmpty(), true);
    });

    it('peek', function() {
        ASSERT.equal(stack.peek(), 1);
        ASSERT.equal(emptyStack.peek(), null);
    });

    it('toArray', function() {
        const arr = stack.toArray();
        ASSERT.equal(Array.isArray(arr), true);
        ASSERT.equal(arr[0], 0);
        ASSERT.equal(arr[1], 1);
    });

    it('pop', function() {
        ASSERT.equal(stack.pop(), 1);
        ASSERT.equal(stack.pop(), 0);
        ASSERT.throws(() => {
            stack.pop(0);
        }, Error, 'Stack is empty');
    });

    it('Stack.fromIterable', function() {
        const stackFromIterable = Stack.fromIterable('ab');
        ASSERT.equal(stackFromIterable.pop(), 'b');
        ASSERT.equal(stackFromIterable.pop(), 'a');
    });
});

describe('class List', function() {
    const list = new List();

    it('isEmpty', function() {
        ASSERT.equal(list.isEmpty(), true);
    });

    it('insert', function() {
        list.insert(1);
        ASSERT.equal(list.isEmpty(), false);
    });

    it(`getValue`, function() {
        ASSERT.equal(list.getValue(), 1);
    });

    it('prev', function() {
        list.insert(2);
        list.toPrev();
        ASSERT.equal(list.getValue(), 1);
        ASSERT.throws(() => {
            list.toPrev();
        }, RangeError, 'First element of the List');
    });

    it('next', function() {
        list.toNext();
        ASSERT.equal(list.getValue(), 2);
        ASSERT.throws(() => {
            list.toNext();
        }, RangeError, 'Last element of the List');
    });

    it('delete', function() {
        list.delete();
        ASSERT.equal(list.getValue(), 1);
        list.delete();
        ASSERT.equal(list.getValue(), null);
    });

});

mocha.run();