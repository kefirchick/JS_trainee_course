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

mocha.run();