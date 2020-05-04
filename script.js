let history = [];
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;

    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation = prev + current;
                break
            case '-':
                computation = prev - current;
                break
            case '*':
                computation = prev * current;
                break
            case '÷':
                computation = prev / current;
                break
            case 'x³':
                computation = current * current *current;
                break
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }

    squareFunction(){
        const current = parseFloat(this.currentOperand);
        this.currentOperand = current * current;
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    }

    cubeFunction(){
        const current = parseFloat(this.currentOperand);
        this.currentOperand = current * current * current;
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    }

    piFunction(){
        this.currentOperand = 3.1415926;
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    }

    sqrtFunction(){
        const current = parseFloat(this.currentOperand);
        this.currentOperand = Math.sqrt(current);
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    }
    
}




const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const squareButton = document.querySelector('[data-operation-square]');
const cubeButton = document.querySelector('[data-operation-cube]');
const piButton = document.querySelector('[data-operation-pi]');
const sqrtButton = document.querySelector('[data-operation-sqrt]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);



numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});

squareButton.addEventListener('click', button => {
    calculator.squareFunction();
});

cubeButton.addEventListener('click', button => {
    calculator.cubeFunction();
});

piButton.addEventListener('click', button => {
    calculator.piFunction();
});

sqrtButton.addEventListener('click', button => {
    calculator.sqrtFunction();
});


function addNightMode(){
    var body = document.body;
    var outputField = document.getElementById("output");
    var buttons = document.querySelectorAll("button.test");

       
    //var buttons = document.getElementById("buttons");
    var i;
    for(i = 0; i < buttons.length; i++){
        console.log("sadasd" + buttons[i]);
        console.log("JOBI");
        buttons[i].classList.toggle("darkButtons");
    }
    

    //buttons.classList.toggle("darkButtons");
    body.classList.toggle("dark-mode");
    outputField.classList.toggle("dark");
}
