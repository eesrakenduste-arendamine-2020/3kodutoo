

var oneBtn = document.getElementById("one");
var twoBtn = document.getElementById("two");
var threeBtn = document.getElementById("three");
var fourBtn = document.getElementById("four");
var fiveBtn = document.getElementById("five");
var sixBtn = document.getElementById("six");
var sevenBtn = document.getElementById("seven");
var eightBtn = document.getElementById("eight");
var nineBtn = document.getElementById("nine");
var zeroBtn = document.getElementById("zero");

var decimalBtn = document.getElementById("decimal");
var equalsBtn = document.getElementById("equals");
var plusBtn = document.getElementById("plus");
var minusBtn = document.getElementById("minus");
var multiplyBtn = document.getElementById("multiply");
var divideBtn = document.getElementById("divide");
var percentBtn = document.getElementById("percent");
var clearBtn = document.getElementById("clear");
var squareBtn = document.getElementById("square");
var squareRootBtn = document.getElementById("square-root");
var sinBtn = document.getElementById("sin");
var cosBtn = document.getElementById("cos");
var tanBtn = document.getElementById("tan");
var displayValElement = document.getElementById('calc-display');

var calcNumBtns = document.getElementsByClassName('calc-num');
var calcOperatorBtns = document.getElementsByClassName('calc-operator');

var displayVal = '0';
var pendingVal;
var evalStringArray =[];

var updateDisplayVal = (clickObj) => {
    var btnText = clickObj.target.innerText;

    if(displayVal == '0'){
        displayVal = '';
    }

    displayVal += btnText;
    displayValElement.innerText = displayVal;
    
}

var performOperation = (clickObj) => {
    var operator = clickObj.target.innerText;

    switch (operator) {
        case '+':
            pendingVal = displayVal;
            displayVal = '0';
            displayValElement.innerText = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('+');
            break;
        case '-':
            pendingVal = displayVal;
            displayVal = '0';
            displayValElement.innerText = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('-');
            break;
        case 'x':
            pendingVal = displayVal;
            displayVal = '0';
            displayValElement.innerText = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('*');
            break;
        case '÷':
            pendingVal = displayVal;
            displayVal = '0';
            displayValElement.innerText = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('/');
            break;
        case '=':
            evalStringArray.push(displayVal);
            var evaluation = eval(evalStringArray.join(' '));
            displayVal = evaluation + '';
            displayValElement.innerText = displayVal;
            evalStringArray = [];
            break;
        default:
            break;
    }
}

for(let i = 0; i < calcNumBtns.length; i++){
    calcNumBtns[i].addEventListener('click', updateDisplayVal, false);

}

for(let i = 0; i< calcOperatorBtns.length; i++){
    calcOperatorBtns[i].addEventListener('click', performOperation, false);
}

sinBtn.onclick = () => {
    displayValElement.innerHTML = Math.sin(displayVal);
}

cosBtn.onclick = () => {
    displayValElement.innerHTML = Math.cos(displayVal);
}

tanBtn.onclick = () => {
    displayValElement.innerHTML = Math.tan(displayVal);
}

squareRootBtn.onclick = () => {
    displayValElement.innerHTML = Math.sqrt(displayVal);
}

squareBtn.onclick = () => {
    evalStringArray.push(pendingVal);    displayValElement.innerHTML = Math.pow(displayVal, 2);
}

percentBtn.onclick = () => {
    displayValElement.innerHTML = displayVal/100;
}

clearBtn.onclick = () =>{
    displayVal = '0';
    pendingVal = undefined;
    displayValElement.innerHTML = displayVal;
}

decimalBtn.onclick = () =>{
    if(!displayVal.includes('.')){
        displayVal += '.';
    }
displayValElement.innerHTML = displayVal;
}


var currentTime = new Date().getHours();
if (8 <= currentTime && currentTime < 20) {
    if (document.body) {
        document.body.className = "day";;
    }
}
else {
    if (document.body) {
        document.body.className = "night";
    }
}