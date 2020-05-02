let history = [];
const modeButton = document.querySelector('[data-mode]');
let cell;
modeButton.addEventListener('click', button => {
  let mode = document.getElementById("mode");
  if (mode.value == "Night mode") {
    $("button").css("color", "white");
    $("button").css("background-color", "black");

    mode.value = "Day mode";
    document.getElementById("historyList").style.color="black";
    document.getElementById("tableT").style.color="black";

  } else {
    $("button").css("color", "black");
    $("button").css("background-color", "white");
    mode.value = "Night mode";
    document.getElementById("historyList").style.color="white";
    document.getElementById("tableT").style.color="white";
    
  }

})

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
        case '^':
          computation = Math.pow(prev, current)
          break
        default:
          return
      }
      history.push(prev + " " + this.operation + " " +  current + " = " + computation + "<br/>")
      document.getElementById("historyList").innerHTML=history;
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
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

    sqrt(){
      const current = parseFloat(this.currentOperand)
      this.currentOperand = Math.sqrt(current)
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)+
      history.push("√ " + current  + " = " + this.currentOperandTextElement.innerText + "<br/>")
      document.getElementById("historyList").innerHTML=history;
    }
    square(){
      const current = parseFloat(this.currentOperand)
      this.currentOperand = Math.pow(current, 2)
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
      history.push(current + " ^2 " + " = " + this.currentOperandTextElement.innerText + "<br/>")
      document.getElementById("historyList").innerHTML=history;
    }

    
    log(){
      const current = parseFloat(this.currentOperand)
      this.currentOperand = Math.log(current)
      this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
      history.push("log " + current  + " = " + this.currentOperandTextElement.innerText + "<br/>")
      document.getElementById("historyList").innerHTML=history;
    }  
  }
  
  
  const numberButtons = document.querySelectorAll('[data-number]')
  const operationButtons = document.querySelectorAll('[data-operation]')
  const equalsButton = document.querySelector('[data-equals]')
  const deleteButton = document.querySelector('[data-delete]')
  const allClearButton = document.querySelector('[data-all-clear]')
  const previousOperandTextElement = document.querySelector('[data-previous-operand]')
  const currentOperandTextElement = document.querySelector('[data-current-operand]')
  const sqrtButton = document.querySelector('[data-sqrt]')
  const squareButton = document.querySelector('[data-square]')
  const logButton = document.querySelector('[data-log]')
  
  
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
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })

  sqrtButton.addEventListener('click', button => {
    calculator.sqrt()
  })

  squareButton.addEventListener('click', button => {
    calculator.square()
  })

  logButton.addEventListener('click', button => {
    calculator.log()
  })

  