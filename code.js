let outputNumber = "0";

let numbers = Array.from(document.querySelectorAll('button.number'));
let result = document.querySelector('.result');
console.log(numbers);
numbers.forEach((number) => {
    number.addEventListener('click', function() {
        if (outputNumber === '0' && number.textContent != '.') {
            outputNumber = number.textContent;
        } else {
            outputNumber += '' + number.textContent;
        }
        result.textContent = outputNumber
    });
});