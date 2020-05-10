"use strict";

var input = document.getElementById('input'),
    number = document.querySelectorAll('.numbers div'),
    operator = document.querySelectorAll('.operators div'),
    result = document.getElementById('result'),
    clear = document.getElementById('clear'),
    resultDisplayed = false;
var pii = document.getElementById('pii');
var ee = document.getElementById('e');
var history1 = document.getElementById('history1');
var historyHeading = document.getElementById('historyHeading');

var calculations = [];

// adding click handlers to number buttons
for (var i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function (e) {
        console.log(e);

        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        if (resultDisplayed === false) {
            if (e.target.id === "pii" || e.target.id === "e") {
                input.innerHTML += e.target.className;
            } else {
                input.innerHTML += e.target.innerHTML;
            }
        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷" || lastChar === "²" || lastChar === "√") {
            if (e.target.id === "pii" || e.target.id === "e") {
                input.innerHTML += e.target.className;
            } else {
                resultDisplayed = false;
                input.innerHTML += e.target.innerHTML;
            }
        } else {
            if (e.target.id === "pii" || e.target.id === "e") {
                resultDisplayed = false;
                input.innerHTML = "";
                input.innerHTML += e.target.className;
            } else {
                resultDisplayed = false;
                input.innerHTML = "";
                input.innerHTML += e.target.innerHTML;
            }
        }

    });
}

// adding click handlers to operator buttons
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function (e) {

        var currentString = input.innerHTML;
        var lastChar = currentString[currentString.length - 1];

        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷" || lastChar === "²" || lastChar === "√") {
            var newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length == 0) {
            console.log("enter a number first");
        } else {
            input.innerHTML += e.target.innerHTML;
        }

    });
}

// on click of 'equal' button
result.addEventListener("click", function () {

    var inputString = input.innerHTML;

    var numbers = inputString.split(/\+|\-|\×|\÷|\²|\√/g);

    var operators = inputString.replace(/[0-9]|\./g, "").split("");

    var sqrroot = operators.indexOf("√");
    while (sqrroot != -1) {
        numbers.splice(sqrroot, 2, Math.sqrt(numbers[sqrroot]));
        operators.splice(sqrroot, 1);
        sqrroot = operators.indexOf("√");
    }

    var power = operators.indexOf("²");
    while (power != -1) {
        numbers.splice(power, 2, numbers[power] * numbers[power]);
        operators.splice(power, 1);
        power = operators.indexOf("²");
    }

    var divide = operators.indexOf("÷");
    while (divide != -1) {
        numbers.splice(divide, 2, numbers[divide] / numbers[divide + 1]);
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
    }

    var multiply = operators.indexOf("×");
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    var subtract = operators.indexOf("-");
    while (subtract != -1) {
        numbers.splice(subtract, 2, numbers[subtract] - numbers[subtract + 1]);
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
    }

    var add = operators.indexOf("+");
    while (add != -1) {
        numbers.splice(add, 2, parseFloat(numbers[add]) + parseFloat(numbers[add + 1]));
        operators.splice(add, 1);
        add = operators.indexOf("+");
    }

    input.innerHTML = numbers[0];

    calculations.push(inputString + "=" + numbers[0]);

    history1.innerHTML = "";
    
    for (var i = 0; i < calculations.length; i++) {
        history1.innerHTML += '<h5>' + calculations[i] + '</h5>';        
    }

    resultDisplayed = true;

});

clear.addEventListener("click", function () {
    input.innerHTML = "";
})



var body = document.getElementById('body');
var btn = document.getElementById('btn');
var calc = document.getElementById('calculator');

btn.addEventListener('click', function() {
    body.classList.toggle('body-after');
    calc.classList.toggle('calculator-after');
    historyHeading.classList.toggle('history1-after');
    history1.classList.toggle('historyHeading-after');
})