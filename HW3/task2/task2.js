function getPersons(name, age) {
    const persons = [];

    validation(name, age);

    // object constructor
    const protoPerson = new Object();
    protoPerson.name = name;
    protoPerson.age = age;
    persons.push(protoPerson);

    // object literal;
    persons.push( {name, age} );

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

function validation(name, age) {
    if (name === undefined || age === undefined) {
        throw new Error('Name and age should be defined');
    }

    const personAge = Number(age);

    if (isNaN(age)) {
        throw new TypeError(`${age} is not a number`);
    }

    if (personAge <= 0 || personAge >= 100) {
        throw new RangeError(`${age} shoud be from 1 to 100`);
    }
}

