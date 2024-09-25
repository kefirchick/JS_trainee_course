const obj1 = {
    key: 4
};
const arr1 = [1, 2, 5, 3, 6, 2];
const arr2 = [1, , 5, , 6, 2];
const arr3 = [1, 2, 'abc', 3, 6, 2];
const cb1 = function(x) {
    return x < 4;
};
const cb2 = (x, i) => x > i;
const cb3 = function(x) {
    return x < this.key;
};
const cb4 = function(x, i, arr) {
    return x + i < arr.length;
};

console.log(arr1.myFilter((x) => x > 4));
console.log(arr1.filter((x) => x > 4));
console.log('=============');
console.log(arr2.myFilter(cb1));
console.log(arr2.filter(cb1));
console.log('=============');
console.log(arr3.myFilter(cb1));
console.log(arr3.filter(cb1));
console.log('=============');
console.log(arr1.myFilter(cb2));
console.log(arr1.filter(cb2));
console.log('=============');
console.log(arr1.myFilter(cb3, obj1));
console.log(arr1.filter(cb3, obj1));
console.log('=============');
console.log([].myFilter(cb1));
console.log([].filter(cb1));
console.log('=============');
console.log(arr1.myFilter(cb3, ' '));
console.log(arr1.filter(cb3, ' '));
console.log('=============');
console.log(arr1.myFilter(cb4));
console.log(arr1.filter(cb4));
console.log('=============');
// console.log(arr1.myFilter());
// console.log(arr1.filter());
// console.log('=============');