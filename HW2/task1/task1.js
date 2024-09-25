const myFilter = function(callback, thisArg) {
    const inputArray = this;

    if (!Array.isArray(inputArray)) {
        throw new TypeError(`${inputArray} is not an array`);
    }

    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`);
    }

    if (typeof thisArg !== undefined) {
        callback = callback.bind(thisArg);
    }
    
    return buildArray(inputArray, callback);
}

function buildArray(input, callback) {
    const result = [];
    
    for (let i = 0; i < input.length; i++) {
        if (callback(input[i], i, input)) {
            result.push(input[i]);
        }
    }
    return result;
}

Array.prototype.myFilter = myFilter;