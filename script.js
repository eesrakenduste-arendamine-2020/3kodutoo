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
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  
    chooseOperation(operation) {
      if (this.currentOperand === '') return;
      if (this.previousOperand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }
  
    compute() {
      let computation;
      const previous = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      let calc = false;
      switch (this.operation) {
        case '+':
          computation = previous + current;
          break;
        case '-':
          computation = previous - current;
          break;
        case '*':
          computation = previous * current;
          break;
        case '÷':
          computation = previous / current;
          break;
       case '~':
          computation = Math.round(previous, 2);
          calc = true;
          break;
        case 'x²':
          computation = previous * previous;
          break;
        case 'x³':
            computation = previous * previous * previous;
          break;
     default:
          return;
      }
      if (calc) {
        showHistory2(previous, this.operation, computation);
      } else {
        showHistory(previous, current, this.operation, computation);
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
        integerDisplay = integerDigits.toLocaleString('en', {
          maximumFractionDigits: 0,
        });
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText = this.getDisplayNumber(
        this.currentOperand
      );
      if (this.operation != null) {
        this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
          this.previousOperand
        )} ${this.operation}`;
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
  const previousOperandTextElement = document.querySelector(
    '[data-previous-operand]'
  );
  const currentOperandTextElement = document.querySelector(
    '[data-current-operand]'
  );
  
  const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
  );
  
  numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText);
      calculator.updateDisplay();
    });
  });
  
  operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText);
      calculator.updateDisplay();
    });
  });
  
  equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
  });
  
  allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
  });
  
  deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
  });
  
  function showHistory(first, second, compute, show) {
    const embeddedHtml = `<div class='history-elements'> ${first} ${compute} ${second} = ${show} </div>`;
    document.getElementById('history').innerHTML += embeddedHtml;
  
  }
  
  function showHistory2(first, compute, show) {
    const embeddedHtml = `
      <div class='history-elements'>
        ${compute} ( ${first} ) = ${show}
      </div>
  `;
    document.getElementById('history').innerHTML += embeddedHtml;
  }
  
  function switchMode() {
    var element = document.body;
    element.classList.toggle("night");
    
  }
