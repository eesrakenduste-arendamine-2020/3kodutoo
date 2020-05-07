class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  piFunction(){
    this.currentOperand = 3.1415926;
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
  }

  x2Function(){
    const current = parseFloat(this.currentOperand);
    this.currentOperand = current * current;
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
}

cosFunction(){
  const current = parseFloat(this.currentOperand);
  this.currentOperand = Math.cos(current);
  this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
}

tanFunction(){
  const current = parseFloat(this.currentOperand);
  this.currentOperand = Math.tan(current);
  this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
}

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const piButton = document.querySelector('[data-pi]');
const x2Button = document.querySelector('[data-x2]');
const cosButton = document.querySelector('[data-cos]');
const tanButton = document.querySelector('[data-tan]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

piButton.addEventListener('click', button => {
  calculator.piFunction();
});

x2Button.addEventListener('click', button => {
  calculator.x2Function();
});

cosButton.addEventListener('click', button => {
  calculator.cosFunction();
});

tanButton.addEventListener('click', button => {
  calculator.tanFunction();
});

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

var options = {
  bottom: '64px', 
  right: 'unset',
  left: '32px', 
  time: '0.5s', 
  mixColor: '#fff', 
  backgroundColor: '#d77474',  
  buttonColorDark: '#100f2c',  
  buttonColorLight: '#fff', 
  saveInCookies: false, 
  label: '🌓' 
}

const darkmode = new Darkmode(options);
darkmode.showWidget();