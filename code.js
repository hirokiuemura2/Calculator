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
        else if (result.textContent.length > 13) {
            return;
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

window.addEventListener('keydown', (e) => {
    let letter = e.key;
    if(!isNaN(parseInt(letter))) {
        let num = (letter == 0) ? 9 : +(letter) - 1;
        numbers[num].click();
    }
    else if (letter === '.') {
        let respectiveButton = document.querySelector('.dot');
        respectiveButton.click();
    }
    else if (letter === 'Enter') {
        let respectiveButton = document.querySelector('.enter');
        respectiveButton.click();
    }
    else if (letter === '-') {
        let respectiveButton = document.querySelector('.minus');
        respectiveButton.click();
    }
    else if (letter === 'Backspace') {
        let respectiveButton = document.querySelector('.delete');
        if (respectiveButton != undefined) {
            respectiveButton.click();
        }
    }
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
        else if (number1 != undefined && outputNumber != undefined) {
            let temp = computeEquation();
            reset();
            result.textContent = temp;
            if (temp != 'Error' && temp != 'Infinity') {
                operation = button.textContent;
                operationBox.textContent = operation;
                number1 = temp;
                nextNewNumber = true;
            }
        }
    });
});

let allConditionsFilled = () => {
    return (number1 !== undefined && number2 !== undefined && operation !== undefined);
};
let computeEquation = function() {
    let decimals = countDecimals(number1, number2);
    number1 = number1 * (Math.pow(10, decimals));
    number2 = number2 * (Math.pow(10, decimals));
    switch (operation) {
        case '+':
            return (Number(number1) + Number(number2)) / (Math.pow(10, decimals));
            break;
        case '–':
            return (Number(number1) - Number(number2)) / (Math.pow(10, decimals));
            break;
        case 'X':
            let product = '' +  (Number(number1) * Number(number2)) / (Math.pow(10, decimals * 2));
            product = product.substring(0,14);
            return product;
            break;
        case '÷':
            if (number2 == 0) {
                return 'Error';
            }
            let quotient = '' + (Number(number1) / Number(number2));
            quotient = quotient.substring(0,14);
            return quotient;
            break;
        case '^':
            number2 = number2 / Math.pow(10,decimals);
            number1 = number1 / Math.pow(10,decimals);
            number1 *= Math.pow(10,decimals = countDecimals(0,number1));
            let power = '' + (Number(number1) ** Number(number2)) / (Math.pow(10, decimals * number2));
            power = power.substring(0,14);
            if (power.charAt(power.length-1) === '.') {
                power = power.substring(0,power.length - 1);
            }
            return power;
            break;
        case 'Mod':
            return (Number(number1) % Number(number2)) / (Math.pow(10, decimals));
            break;
    }
}

let countDecimals = (x, z) => {
    let decOne = 0;
    let decTwo = 0;
    x = '' + x;
    z = '' + z;
    if (x.indexOf('.') !== -1) {
        decOne = x.length - x.indexOf('.') - 1;
    }
    if (z.indexOf('.') !== -1) {
        decTwo = z.length - z.indexOf('.') - 1;
    }
    return (decOne > decTwo) ? decOne : decTwo;
};

let actions = Array.from(document.querySelectorAll('.action'));
actions.forEach((button) => {
    button.addEventListener('click', () => {
        let action = button.textContent;
        if (outputNumber === undefined && result.textContent !== 'Error' && result.textContent != 'NaN') {
            return;
        }
        switch(action) {
            case '+/–':
                if (operation === undefined) {
                    outputNumber *= -1;
                    result.textContent = outputNumber;
                    outputNumber = '' + outputNumber;
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
                    number1 = (outputNumber != 'Error' ? outputNumber : undefined);
                    number2 = undefined;
                    operationBox.textContent = '';
                    operation = undefined;
                    nextNewNumber = true;
                    if (outputNumber == 'Error' || outputNumber == 'NaN') {
                        outputNumber = undefined;
                    }
                }
                break;
            case 'Del':
                if (result.textContent == 'Error' || result.textContent == 'NaN') {
                    reset();
                } else if (operation === undefined && nextNewNumber) {
                    reset();
                } else if (!nextNewNumber) {
                    outputNumber = outputNumber.substring(0,outputNumber.length-1);
                    result.textContent = outputNumber;
                    if (outputNumber.length === 0) {
                        result.textContent = '0';
                        outputNumber = undefined;
                    }
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
    let deleteButton = document.querySelector('.rm');
    let reverseButton = document.querySelector('.reverse');
    let divideButton = document.querySelector('.divide');
    let multiplyButton = document.querySelector('.multiply');
    deleteButton.textContent = seconded ? 'Clr' : 'Del';
    if (seconded) {
        deleteButton.classList.remove('delete')
    } else {
        deleteButton.classList.add('delete');
    }
    reverseButton.textContent = seconded ? '%' : '+/–';
    divideButton.textContent = seconded ? 'Mod' : '÷'
    multiplyButton.textContent = seconded ? '^' : 'X';
    secondButton.textContent = seconded ? '1st' : '2nd';
});