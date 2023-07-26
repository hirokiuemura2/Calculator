let outputNumber = undefined;
let number1 = undefined;
let number2 = undefined;
let operation = undefined;
let nextNewNumber = false;

let numbers = Array.from(document.querySelectorAll('button.number'));
let result = document.querySelector('.result');
numbers.forEach((number) => {
    number.addEventListener('click', function() {
        if (nextNewNumber) {
            outputNumber = undefined;
            nextNewNumber = false;
        }
        let newText = number.textContent;
        if (newText === '(-)') {
            newText = '-';
        }
        if (outputNumber === undefined && newText != '.') {
            outputNumber = newText;
        } else if (outputNumber === undefined && newText == '.') {
            outputNumber = '0.';
        } else if (!(newText == '.' && outputNumber.includes('.'))) {
            if (newText != '-') {
                outputNumber += '' + newText;
            }
        }
        result.textContent = outputNumber;
        if (operation !== undefined) {
            number2 = outputNumber;
        }
    });
});

let operators = Array.from(document.querySelectorAll('.operator'));
let operationBox = document.querySelector('.operation');
operators.forEach((button) => {
    button.addEventListener('click', function() {
        if (outputNumber != undefined && number2 === undefined) {
            operation = button.textContent;
            number1 = Number(outputNumber);
            nextNewNumber = true;
            operationBox.textContent = operation;
        }
    });
});

let allConditionsFilled = () => {
    return (number1 !== undefined && number2 !== undefined && operation !== undefined);
}
let computeEquation = () => {
    switch (operation) {
        case '+':
            return Number(number1) + Number(number2);
            break;
        case '–':
            return Number(number1) - Number(number2);
            break;
        case 'X':
            return Number(number1) * Number(number2);
            break;
        case '÷':
            return Number(number1) / Number(number2);
            break;
        case '^':
            return Number(number1) ** Number(number2);
            break;
        case 'Mod':
            return Number(number1) % Number(number2);
            break;
    }
}

let actions = Array.from(document.querySelectorAll('.action'));
actions.forEach((button) => {
    button.addEventListener('click', () => {
        let action = button.textContent;
        if (outputNumber === undefined) {
            return;
        }
        switch(action) {
            case '+/–':
                if (operation === undefined) {
                    outputNumber *= -1;
                    result.textContent = outputNumber;
                    break;
                }
            case '%':
                if (operation === undefined) {
                    outputNumber /= 100;
                    result.textContent = outputNumber;
                }
                break;
            case 'Enter':
                if (allConditionsFilled()) {
                    outputNumber = computeEquation();
                    result.textContent = outputNumber;
                    number1 = outputNumber;
                    number2 = undefined;
                    operationBox.textContent = '';
                    operation = undefined;
                    nextNewNumber = true;
                }
                break;
            case 'Del':
                if (operation === undefined && nextNewNumber) {
                    reset();
                }
                else if (!nextNewNumber) {
                    outputNumber = outputNumber.substring(0,outputNumber.length-1);
                    result.textContent = outputNumber;
                }
                break;
            case 'Clr':
                reset();
                break;
        }
    });
});

let reset = function() {
    outputNumber = undefined;
    number1 = undefined;
    number2 = undefined;
    operation = undefined;
    nextNewNumber = false;
    operationBox.textContent = '';
    result.textContent = '0';
}

let seconded = false;
let secondButton = document.querySelector('.second');
secondButton.addEventListener('click', () => {
    seconded = !seconded;
    let deleteButton = document.querySelector('.delete');
    let reverseButton = document.querySelector('.reverse');
    let divideButton = document.querySelector('.divide');
    let multiplyButton = document.querySelector('.multiply');
    deleteButton.textContent = seconded ? 'Clr' : 'Del';
    reverseButton.textContent = seconded ? '%' : '+/–';
    divideButton.textContent = seconded ? 'Mod' : '÷'
    multiplyButton.textContent = seconded ? '^' : 'X';
    secondButton.textContent = seconded ? '1st' : '2nd';
});