mocha.setup('bdd');
const ASSERT = chai.assert;

describe('getPersons(name, age)', function() {
    const name = 'john';
    const age = 18;

    const persons = getPersons('john', 18);

    for (let i = 0; i < persons.length; i++) {
        it(`Object ${i} has properties name: ${name}, age: ${age}`, function() {
            ASSERT.equal(persons[i]['name'], name);
            ASSERT.equal(persons[i]['age'], age);
        });
    }

    it('Throws an error with no input values', function() {
        ASSERT.throws(() => {
            getPersons();
        }, Error);

        ASSERT.throws(() => {
            getPersons('jhon');
        }, Error);
    });

    it('Throws an error with the wrong age type', function() {
        ASSERT.throws(() => {
            getPersons('jhon', 'abc');
        }, TypeError);
    });

    it('Throws an error with the wrong age number', function() {
        ASSERT.throws(() => {
            getPersons('jhon', 0);
        }, RangeError);

        ASSERT.throws(() => {
            getPersons('jhon', 100);
        }, RangeError);
    });
});

mocha.run();