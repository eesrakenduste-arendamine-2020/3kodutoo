$(document).ready(function () {
    var result = 0;
    var prevEntry = 0;
    var operation = null;
    var currentEntry = '0';
    var history = [];
    updateScreen(result);


    /*$('.button_d/n').on('click', function (evt) {
        if (counter == 0) {
            counter = 1;
            $('html').css('filter', 'invert(100%)');
        } else {
            counter = 0;
            $('html').css('filter', 'invert(0%)');
        }
        console.log("got it");
    })*/

    $('.button').on('click', function (evt) {
        var buttonPressed = $(this).html();
        console.log(buttonPressed);

        if (buttonPressed === "C") {
            result = 0;
            currentEntry = '0';
        } else if (buttonPressed === "CE") {
            currentEntry = '0';
        } else if (buttonPressed === "back") {
            currentEntry = currentEntry.substring(0, currentEntry.length-1);
        } else if (buttonPressed === "+/-") {
            currentEntry *= -1;
        } else if (buttonPressed === '.') {
            currentEntry += '.';
        } else if (isNumber(buttonPressed)) {
            if (currentEntry === '0') currentEntry = buttonPressed;
            else currentEntry = currentEntry + buttonPressed;
        } else if (isOperator(buttonPressed)) {
            prevEntry = parseFloat(currentEntry);
            operation = buttonPressed;
            currentEntry = '';
        } else if (buttonPressed === '%') {
            currentEntry = currentEntry / 100;
        } else if (buttonPressed === 'sqrt') {
            currentEntry = Math.sqrt(currentEntry);
        } else if (buttonPressed === '1/x') {
            currentEntry = 1 / currentEntry;
        } else if (buttonPressed === 'pi') {
            currentEntry = Math.PI;
        } else if (buttonPressed === '=') {
            var firstEntry = parseFloat(currentEntry);
            currentEntry = operate(prevEntry, currentEntry, operation);
            prevEntry = prevEntry.toString();
            currentEntry = currentEntry.toString();
            equation = prevEntry.concat(operation, firstEntry, "=", currentEntry);
            console.log(equation);
            history.push(equation);
            document.getElementById("history").innerHTML = history;
            operation = null;
        } else if (buttonPressed === 'sin') {
            currentEntry = Math.sin(currentEntry);
        } else if (buttonPressed === 'cos') {
            currentEntry = Math.cos(currentEntry);
        } else if (buttonPressed === 'tan') {
            currentEntry = Math.tan(currentEntry);
        } else if (buttonPressed === 'log') {
            currentEntry = Math.log(currentEntry);
        } else if (buttonPressed === 'day') {
            $('html').css('filter', 'invert(100%)');
            $('.button.theme').text('night');
        } else if (buttonPressed === 'night') {
            $('html').css('filter', 'invert(0%)');
            $('.button.theme').text('day');
        }

        updateScreen(currentEntry);
        document.getElementById("clear").addEventListener('click', function () {
            history = [];
            document.getElementById("history").innerHTML = history;
        });
    });
});

updateScreen = function (displayValue) {
    var displayValue = displayValue.toString();
    $('.screen').html(displayValue.substring(0, 10));
};

isNumber = function (value) {
    return !isNaN(value);
}

isOperator = function (value) {
    return value === '/' || value === '*' || value === '+' || value === '-';
};

operate = function (a, b, operation) {
    a = parseFloat(a);
    b = parseFloat(b);
    console.log(a, operation, b);
    if (operation === '+') return a + b;
    if (operation === '-') return a - b;
    if (operation === '*') return a * b;
    if (operation === '/') return a / b;
}

