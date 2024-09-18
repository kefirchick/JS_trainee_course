let number = 0;

while (true) {
    number = +prompt('Type a number:', 0);
    alert(`Your number in the binary form: ${number.toString(2)}`);
}