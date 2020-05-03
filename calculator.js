class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.currentOperandTextElementAjalugu = currentOperandTextElementAjalugu
        this.previousOperandTextElementAjalugu = previousOperandTextElementAjalugu
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
    compute_symbols() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        switch (this.operation) {
            case '√':
                computation = Math.sqrt(prev)
                break
            case 'x²':
                computation = prev * prev
                break
            case 'x³':
                computation = prev * prev * prev
                break
            case '∛':
                computation = Math.cbrt(prev)
                break
            default:
                return
        }
        this.currentOperand = computation
        /*this.operation = undefined
        this.previousOperand = ''*/
    }
  
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('et', { maximumFractionDigits: 0 })
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

    
    updateDisplay_ajalugu() {
    this.previousOperandTextElementAjalugu.innerText +=
        this.getDisplayNumber(this.currentOperand) + "\n";
           if (this.operation != null) {
              this.previousOperandTextElementAjalugu.innerText +=
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` +"\n";
           }
          }
      
      
}
    const numberButtons = document.querySelectorAll('[data-number]')
    const operationButtons = document.querySelectorAll('[data-operation]')
    const equalsButton = document.querySelector('[data-equals]')
    const deleteButton = document.querySelector('[data-delete]')
    const symbolsButtons = document.querySelectorAll('[data-operation-symbols]')
    const allClearButton = document.querySelector('[data-all-clear]')
    const previousOperandTextElement = document.querySelector('[data-previous-operand]')
    const currentOperandTextElement = document.querySelector('[data-current-operand]')
const currentOperandTextElementAjalugu = document.querySelector('[ajalugu-data-current-operand]')
const previousOperandTextElementAjalugu = document.querySelector('[ajalugu-data-previous-operand]')
  
     const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement, currentOperandTextElementAjalugu, previousOperandTextElementAjalugu)
  
  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
        //calculator.updateDisplay_ajalugu()
    })
  })
  
  operationButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
        calculator.updateDisplay_ajalugu()
    })
  })

  symbolsButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.compute_symbols()
        calculator.updateDisplay()
   calculator.updateDisplay_ajalugu()
    })
  })
  
  equalsButton.addEventListener('click', button => {
    calculator.compute()
      calculator.updateDisplay()
      calculator.updateDisplay_ajalugu()
  })
  
  allClearButton.addEventListener('click', button => {
    calculator.clear()
      calculator.updateDisplay()
  })
  
  deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })
