mocha.setup('bdd');
const ASSERT = chai.assert;

describe('class Calculator', function() {
    const calculator = new Calculator(6, 2);

    it(`logSum`, function() {
        ASSERT.equal(calculator.logSum(), 8);
        const logSum = calculator.logSum;
        ASSERT.equal(logSum(), 8);
    });

    it(`logMul`, function() {
        ASSERT.equal(calculator.logMul(), 12);
        const logMul = calculator.logMul;
        ASSERT.equal(logMul(), 12);
    });

    it(`logSub`, function() {
        ASSERT.equal(calculator.logSub(), 4);
        const logSub = calculator.logSub;
        ASSERT.equal(logSub(), 4);
    });

    it(`logDiv`, function() {
        ASSERT.equal(calculator.logDiv(), 3);
        const logDiv = calculator.logDiv;
        ASSERT.equal(logDiv(), 3);
        calculator.setY = 0;
        ASSERT.throws(() => {
            calculator.logDiv();
        }, Error);
    });

    it(`setX`, function() {
        ASSERT.throws(() => {
            calculator.setX = 'abc';
        }, TypeError);
        ASSERT.throws(() => {
            calculator.setX = Infinity;
        }, RangeError);
        ASSERT.throws(() => {
            calculator.setX = NaN;
        }, TypeError);
    });

    it(`setY`, function() {
        ASSERT.throws(() => {
            calculator.setY = 'abc';
        }, TypeError);
        ASSERT.throws(() => {
            calculator.setY = Infinity;
        }, RangeError);
        ASSERT.throws(() => {
            calculator.setY = NaN;
        }, TypeError);
    });
});

mocha.run();