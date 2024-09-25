mocha.setup('bdd');
const ASSERT = chai.assert;

describe('myFilter', function() {
    const arr1 = [1, 2, 5, 3, 6, 2];
    const arr2 = [1, , 5, , 6, 2];
    const arr3 = [1, 2, 'abc', 3, 6, 2];
    const obj1 = {
        key: 4
    };
    
    const cb1 = function(val) {
        return val < 4;
    };
    
    const cb2 = (val, i) => {
        return val > i;
    };
    
    const cb3 = function(val) {
        return val < this.key;
    };
    
    const cb4 = function(val, i, arr) {
        return val + i < arr.length;
    };

    it('arr1.myFilter(cb1) === arr1.filter(cb1)', function() {
        ASSERT.equal(JSON.stringify(arr1.myFilter(cb1)), JSON.stringify(arr1.filter(cb1)));
    });

    it('arr2.myFilter(cb1) === arr2.filter(cb1)', function() {
        ASSERT.equal(JSON.stringify(arr2.myFilter(cb1)), JSON.stringify(arr2.filter(cb1)));
    });

    it('arr3.myFilter(cb1) === arr3.filter(cb1)', function() {
        ASSERT.equal(JSON.stringify(arr3.myFilter(cb1)), JSON.stringify(arr3.filter(cb1)));
    });

    it('arr1.myFilter(cb2) === arr1.filter(cb2)', function() {
        ASSERT.equal(JSON.stringify(arr1.myFilter(cb2)), JSON.stringify(arr1.filter(cb2)));
    });

    it('arr1.myFilter(cb3, obj1) === arr1.filter(cb3, obj1)', function() {
        ASSERT.equal(JSON.stringify(arr1.myFilter(cb3, obj1)), JSON.stringify(arr1.filter(cb3, obj1)));
    });

    it('[].myFilter(cb1) === [].filter(cb1)', function() {
        ASSERT.equal(JSON.stringify([].myFilter(cb1)), JSON.stringify([].filter(cb1)));
    });

    it('arr1.myFilter(cb3, " ") === arr1.filter(cb3, " ")', function() {
        ASSERT.equal(JSON.stringify(arr1.myFilter(cb3, ' ')), JSON.stringify(arr1.filter(cb3, ' ')));
    });

    it('arr1.myFilter(cb4) === arr1.filter(cb4)', function() {
        ASSERT.equal(JSON.stringify(arr1.myFilter(cb1)), JSON.stringify(arr1.filter(cb1)));
    });

    it('throw an error with arr1.myFilter()', function() {
        ASSERT.throws(() => arr1.myFilter(), TypeError);
    });
});

mocha.run();