let repository = document.querySelector('#repository');
let backgroundContainer= document.querySelector('#nightmode');

backgroundContainer.addEventListener('click', changeBackground);
repository.addEventListener("click", ()=>{
    window.location.href="https://github.com/tmiilits/3kodutoo";
});

function changeBackground(){
    var nightmode = document.getElementById('nightmode')
    if(nightmode.value == "Nightmode ON"){
        nightmode.value = "Nightmode OFF";
      
        $('body').css('backgroundImage', 'url("night.jpg")');
        $('#name').css('color', 'white');
        $('.calculator-grid > button').css('background-color', 'rgba(0, 0, 0, .75');
        $('.calculator-grid > button').css('color', 'white');
        $('.output').css('background-color', 'rgba(0, 0, 0, .9');
        $('.output .current-operand').css('color', 'rgba(241, 198, 132, 1)');
        $('.output .previous-operand').css('color', 'rgba(248, 218, 161, 0.7)');
        $('.calculator-grid .operations').css('color', 'rgba(248, 218, 161, 0.8)');
        $('.calculator-grid .span-two').css('color', 'rgba(248, 218, 161, 0.8)');

    }else{
        nightmode.value = "Nightmode ON";
        $('body').css('backgroundImage', 'url("day.jpg")');
        $('#name').css('color', 'black');
        $('.calculator-grid > button').css('background-color', 'rgba(255, 255, 255, .7');
        $('.calculator-grid > button').css('color', 'black');
        $('.calculator-grid > button > button:hover').css('background-color', 'rgba(255, 255, 255, .9');
        $('.calculator-grid .operations').css('background-color', 'rgba(248, 218, 161, 0.8)');
        $('.calculator-grid .span-two').css('background-color', 'rgba(248, 218, 161, 0.8)');
        $('.output .current-operand').css('color', 'white');
        $('.output .previous-operand').css('color', 'rgba(255, 255, 255, .75)');
        $('.output').css('background-color', 'rgba(0, 0, 0, .75');
    }
}

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement;
      this.currentOperandTextElement = currentOperandTextElement;
      this.clear();
    }
  
    clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
    }
  
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  
    appendNumber(number) {
      if (number == '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  
    chooseOperation(operation) {
      if (this.currentOperand == '') return;
      if (this.previousOperand != '') {
        this.compute();
        this.computeSpecial();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }

    computeSpecial() {
      let computation
      const prev = parseFloat(this.previousOperand)
      switch (this.operation) {
        case '%':
          computation = 0.01 * prev;
          break;
        case 'x²': 
          computation = prev * prev;
          break;
        case 'x³':
          computation = prev * prev * prev;
          break;
        case '√':
          computation = Math.sqrt(prev);
          break;
        case 'π':
          computation = 3.14159265359 * prev; //approximately
          break;
        default:
          return;
      }
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = '';
    }
    
    compute() {
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case 'x':
          computation = prev * current;
          break;
        case '÷':
          computation = prev / current;
          break;
        default:
          return;
      }
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = '';
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const decimalDigits = stringNumber.split('.')[1];
      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
      if (this.operation != null) {
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
      } else {
        this.previousOperandTextElement.innerText = '';
      }
    }
  }
  
  const numberButtons = document.querySelectorAll('[data-number]');
  const operationButtons = document.querySelectorAll('[data-operation]');
  const equalsButton = document.querySelector('[data-equals]');
  const deleteButton = document.querySelector('[data-delete]');
  const allClearButton = document.querySelector('[data-all-clear]');
  const previousOperandTextElement = document.querySelector('[data-previous-operand]');
  const currentOperandTextElement = document.querySelector('[data-current-operand]');
  
  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    })
  })

  equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.computeSpecial();
    calculator.updateDisplay();
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
  })