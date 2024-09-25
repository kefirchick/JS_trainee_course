const myFilter = function(callback, thisArg) {
    const inputArray = this;

    if (typeof callback !== 'function') {
        throw new TypeError(`${callback} is not a function`);
    }

    if (thisArg !== undefined) {
        callback = callback.bind(thisArg);
    }


    return buildArray(inputArray, callback);
}

function buildArray(input, callback) {
    result = [];
    
    for (let i = 0; i < input.length; i++) {
        if (callback(input[i], i, input)) {
            result.push(input[i]);
        };
    };
    return result;
}

Array.prototype.myFilter = myFilter;