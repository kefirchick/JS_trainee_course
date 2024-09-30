function getPersons(name, age) {
    const persons = [];

    validate(name, age);

    // object constructor (object literal syntax)
    const protoPerson = {};
    protoPerson.name = name;
    protoPerson.age = age;
    persons.push(protoPerson);

    // object deconstruction;
    persons.push( {...protoPerson} );

    // constructor function
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    persons.push( new Person(name, age) );

    // copying object
    persons.push( Object.assign({}, protoPerson) );

    // define the the properties with the descriptors
    const descriptors = Object.getOwnPropertyDescriptors(protoPerson);
    persons.push( Object.defineProperties({}, descriptors) );

    // from the iterable
    const entries = Object.entries(protoPerson);
    persons.push( Object.fromEntries(entries) );

    // from the JSON string
    const strPerson = JSON.stringify(protoPerson);
    persons.push( JSON.parse(strPerson) );

    // creating object with the prototype
    persons.push( Object.create(protoPerson) );

    return persons;
}

function validate(name, age) {
    if (name === undefined || age === undefined) {
        throw new Error('Name and age should be defined');
    }

    if (typeof age !== 'number' || Number.isNaN(age)) {
        throw new TypeError(`${age} is not a number`);
    }

    if (age <= 0 || age >= 100) {
        throw new RangeError(`${age} shoud be from 1 to 100`);
    }
}

