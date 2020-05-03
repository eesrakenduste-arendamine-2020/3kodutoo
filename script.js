let ajalugu = [];
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {/*funktsioon mis eemaldab kõik */
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)/*eemaldab viimase numbri kalkulaatorist */
  }

  appendNumber(number) {/*kui kasutaja vajutab numbri nupule siis tuleb ekraanile*/
    if (number === '.' && this.currentOperand.includes('.')) return/*kasutaja saab sisestada ainult ühe koma */
    this.currentOperand = this.currentOperand.toString() + number.toString()/*teeme stringiks sest muidu js ei laseks panna numbreid järjestatult */
  }

  chooseOperation(operation) {/*kui kasutaja vajutab nupule mis lahutab liidab jagab*/
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {/*kui tehtakse mitmeid arvutusi siis arvutatakse ennem ära kui mindakse järgmise juurde */
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {/*väljastab kalkulaatori ekraanil ühe väärtuse, mis tuleb tehtest */
    let computation
    const prev = parseFloat(this.previousOperand)/*teeme stringi numbriks */
    const current = parseFloat(this.currentOperand)/*teeme stringi numbriks */
    if (isNaN(prev) || isNaN(current)) return/*kui pole sisestatud numbreid siis ei tehta midagi*/
    switch (this.operation) {/*sama põhimõttega mis mitmeid if lauseid kuid laseb ühel objectil teha mitmeid if lauseid */
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
      default:/*kui sümbolitest ei kasutada midagi siis kõik mis default ei tehta arvutusi*/
        return
    }
    ajalugu.push(prev + " " + this.operation + " " +  current + " = " + computation + "<br/>")
    document.getElementById("histList").innerHTML=ajalugu;
    this.currentOperand = computation/*teeb kalkulaatori ekraani tühjaks kui arvutus tehtud, v.a vastus */
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {//kui ei ole number
      integerDisplay = ''//siis integeri ei tule
    } else {// ja kui pandakse number siis 
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {/*uuendab ekraani kalkukaatoril*/
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }

  sqrtFunction(){
    const current = parseFloat(this.currentOperand)
    this.currentOperand = Math.sqrt(current)
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)+
    ajalugu.push("√ " + current  + " = " + this.currentOperandTextElement.innerText + "<br/>")
    document.getElementById("histList").innerHTML=ajalugu;
  }

  squareFunction(){
    const current = parseFloat(this.currentOperand)
    this.currentOperand = Math.pow(current, 2)
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    ajalugu.push(current + " x2 " + " = " + this.currentOperandTextElement.innerText + "<br/>")
    document.getElementById("histList").innerHTML=ajalugu;
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')/*klakulaatori tekst*/
const currentOperandTextElement = document.querySelector('[data-current-operand]')/*klakulaatori tekst*/
const sqrtButton = document.querySelector('[sqrt-operation]')
const squareButton = document.querySelector('[square-operation]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener('click', () => {/*nupule vajutades juhtub midagi */
    calculator.appendNumber(button.innerText)/*lisab numbri 123456789 jne */
    calculator.updateDisplay()/*uuendatakse kalkulaatori ekraani iga kord kui nupp vajutatud */
  })
})

operationButtons.forEach(button => {/*operatsiooni nuppu vajutades liigutatakse tekst kalku ekraanil ülesse poole*/
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {/*arvutuse funkts */
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {/*tühjendab kalkulaatori */
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {/*eemaldab numbri klikkides */
  calculator.delete()
  calculator.updateDisplay()
})

sqrtButton.addEventListener('click', button => {
  calculator.sqrtFunction()
})

squareButton.addEventListener('click', button => {
  calculator.squareFunction()
})
