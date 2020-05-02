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
        if (number === "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === "") {
            this.operation = operation
            return
        }
        if (this.previousOperand !== "") {
            console.log(operation)
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        let op = false
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
            case 'sqrt':
                computation = Math.sqrt(prev);
                op = true
                break
            case 'Power 2':
                computation = Math.pow(prev, 2);
                op = true
                break
            case 'Round':
                computation = Math.round(prev, 2);
                op = true
                break
            case 'abs':
                computation = Math.abs(prev);
                op = true
                break
            case 'log':
                computation = Math.log(prev);
                op = true
                break
            case 'log10':
                computation = Math.log10(prev);
                op = true
                break
            case 'log2':
                computation = Math.log2(prev);
                op = true
                break
            case 'cos':
                computation = Math.cos(prev);
                op = true
                break
            default:
                return;
        }
        if (op) {
            createHistory2(prev, this.operation, computation)
        } else {
            createHistory(prev, current, this.operation, computation)
        }
        console.log(computation)
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
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplayValue() {
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
const equalsbutton = document.querySelector('[data-equals]')
const deletebutton = document.querySelector('[data-clear]')
const allClearbutton = document.querySelector('[data-all-Clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {

        calculator.appendNumber(button.innerText)
        calculator.updateDisplayValue()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplayValue()
    })
})
equalsbutton.addEventListener("click", () => {
    calculator.compute()
    calculator.updateDisplayValue()
})

allClearbutton.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplayValue()
})

deletebutton.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplayValue()
})

function createHistory(nr1, nr2, operation, answer) {
    var node = document.createElement("div")
    node.setAttribute("Class", "history-elements")
    var textnode = document.createTextNode("Calculation: " + nr1 + operation + nr2 + "=" + answer)
    node.appendChild(textnode)
    document.getElementById("history").appendChild(node)
}

function createHistory2(nr1, operation, answer) {
    var node = document.createElement("div")
    node.setAttribute("Class", "history-elements")
    var textnode = document.createTextNode("Calculation: " + operation + "(" + nr1 + ") = " + answer)
    node.appendChild(textnode)
    document.getElementById("history").appendChild(node)
}

function dateTimeDisplay() {
    const element = document.getElementById("date-time")
    const background = document.getElementById("main-body")
    if (element.textContent === "Dark") {
        background.className = "bg-night"
        element.textContent = "Day"
    } else {
        background.className = "bg-day"
        element.textContent = "Dark"
    }
}

function hideButtons() {
    const background = document.getElementById("secretButtons")
    console.log()
    if (background.className === "calculator-grid-hidden") {
        background.className = "calculator-grid"
    } else {
        background.className = "calculator-grid-hidden"
    }

}