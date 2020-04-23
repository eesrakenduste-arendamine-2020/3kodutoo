class Calculator{
    constructor(prevOpText, currentOpText){
        this.prevOpText = prevOpText;
        this.currentOpText = currentOpText;
        this.operation = operationButton;
        //load site in night-mode
        this.currentMode = 1;
        this.toHistory1 = toHistory1;
        this.toHistory2 = toHistory2;
        this.toHistory3 = toHistory3;
        this.toHistory4 = toHistory4;

        this.history = JSON.parse(localStorage.getItem("history")) || [];
        this.clear();
    }

    delete(){
        this.currentText = this.currentText.toString().slice(0, -1);
    }

    clear(){
        $('#1').on('click', ()=>this.viewHistory());
        $('#3').on('click', ()=>this.viewDeveloper());
        this.currentText = '';
        this.prevText = '';
        this.operation = undefined;
    }

    appendNumber(number){
        if(number === '.' && this.currentText.includes('.')) return;
        if(number === '.' && this.currentText == ''){
            this.currentText = 0.;
        }
        this.currentText = this.currentText.toString() + number.toString();
    }

    operationSelected(operation){
        if(this.currentText === '' && operation !== 'log' && operation !=='√') return;
        this.operation = operation;
        this.prevText = this.currentText;
        this.toHistory1 = this.currentText;
        this.toHistory2 = this.operation;
        this.currentText = '';
    }

    calculate(){
        let calculation;
        const prev = parseFloat(this.prevText);
        const current = parseFloat(this.currentText);
        this.toHistory3 = this.currentText;
        if(isNaN(prev) && this.operation !== 'log' && this.operation !=='√' || isNaN(current) && this.operation !== 'log' && this.operation !=='√' && this.operation !=='²') return;
        switch(this.operation){
            case '+':
                calculation = prev + current;
                break;
            case '÷':
                calculation = prev / current;
                break;
            case '⨉':
                calculation = prev * current;
                break;
            case '-':
                calculation = prev - current;
                break;
            case '√':
                calculation = Math.sqrt(current);
                break;
            case '²':
                calculation = prev ** 2;
                break;  
            case 'log':
                calculation = Math.log10(current);
                break;
            default:
                return;
        }
        this.currentText = calculation;
        this.toHistory4 = calculation.toString();
        this.operation = undefined;
        this.prevText = '';
    }

    displayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)){
            integerDisplay = '';
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }
        if(decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        }else{
            return integerDisplay;
        }
    }

    updateOutput(){
        this.currentOpText.innerText = this.displayNumber(this.currentText);
        if(this.operation != null){
            this.prevOpText.innerText =
            `${this.displayNumber(this.prevText)} ${this.operation}`
        }else{
            this.prevOpText.innerText = '';
        }
    }

    storeHistory(){
        let savedHistory = {
            calculation: this.toHistory1 + this.toHistory2 + this.toHistory3,
            result: this.toHistory4
        }
        this.history.push(savedHistory);
        localStorage.setItem("history", JSON.stringify(this.history));
    }

    viewHistory(){  
        $('#50').fadeToggle("fast");
        $('#51').html("");
        for(let i=0; i<25; i++){
            $('#51').append(this.history[i].calculation + " = " + this.history[i].result + "<br>");
        }     
    }

    viewDeveloper(){
        $('#55').fadeToggle();
    }

    changeMode(){
        let current;
        //1 - night
        //0 - day

        if(this.currentMode==1){
            current=0;
            this.currentMode=0;
        }else{
            current=1;
            this.currentMode=1;
        }

        //set body to day/night and switch day/night logo
        if(current == 0){
            document.body.classList.remove('body-night');
            document.body.classList.add('body-day');
            document.getElementById("5").innerHTML = "🌞"
        }else if (current==1){
            document.body.classList.remove('body-day');
            document.body.classList.add('body-night');
            document.getElementById("5").innerHTML = "🌙";
        }
     
        //toggle screen elements to day
        document.getElementById("26").classList.toggle('calculator-display-day');
        document.getElementById("27").classList.toggle('display-prev-day');
        document.getElementById("28").classList.toggle('display-current-day');

        //toggle task bar to day
        document.getElementById("52").classList.toggle('task-bar-day');

        //toggle history screen to day
        document.getElementById("50").classList.toggle('history-day');
        document.getElementById("51").classList.toggle('calculation-day');

        //toggle dev info to day
        document.getElementById("55").classList.toggle('dev-info-day');
        
        //toggle buttons to day
        for(let i = 4; i<=23; i++){
            //small button to day
            document.getElementById(i).classList.toggle("btn-day");
        }
        for(let i = 24; i<=25; i++){
            //big button to day
            document.getElementById(i).classList.toggle("span-long-day");
        }
        for(let i = 1; i<=3; i++){
            //task button to day
            document.getElementById(i).classList.toggle("task-btn-day");
        }
    }
}

const numberButton = document.querySelectorAll('[data-number]');
const operationButton = document.querySelectorAll('[data-operate]');
const display = document.getElementsByClassName('calculator-display');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const modeButton = document.querySelector('[data-mode]');
const prevOpText = document.querySelector('[data-previous]');
const currentOpText = document.querySelector('[data-current]');
const historyButton = document.querySelector('[data-history]');

let toHistory1;
let toHistory2;
let toHistory3;
let toHistory4;

let calculator = new Calculator(prevOpText, currentOpText);

numberButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateOutput();
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.operationSelected(button.innerText);
        calculator.updateOutput();
    })
})


equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.storeHistory();
    calculator.updateOutput();
    
})

clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateOutput();
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateOutput();
})

modeButton.addEventListener('click', () => {
    calculator.changeMode();
})