
var elements = document.getElementsByClassName('num');
var calcMemoryString;
var memoryDiv = document.getElementsByClassName('memory');

for(var i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", theValue(i));
}

function theValue(i) {
 return function (){    
    if (elements[i].innerText != "=" && elements[i].innerText != "C" && elements[i].innerText != "x²" 
    && elements[i].innerText != "√" && elements[i].innerText != "Log" && elements[i].innerText != "Bin") {
        document.calc.txt.value += elements[i].innerText;
    } else if( elements[i].innerText == "=" && document.calc.txt.value != "") {

        calcMemoryString = calc.txt.value + " = ";
        document.calc.txt.value = eval(calc.txt.value);
        calcMemoryString += eval(calc.txt.value);        
        $('<p>' + calcMemoryString + '</p>').appendTo('.memory');

    } else if( elements[i].innerText == "C" ) {
        document.calc.txt.value = "";

    } else if( elements[i].innerText == "x²") {
        document.calc.txt.value += "**2";

    } else if( elements[i].innerText == "√") {
        document.calc.txt.value += "Math.sqrt(";

    } else if ( elements[i].innerText == "Log" ) {
        document.calc.txt.value += "Math.log(";

    } else if ( elements[i].innerText == "Bin" ) {
        document.calc.txt.value = DecimalToBinary(eval(calc.txt.value));
        calcMemoryString = document.calc.txt.value;
        $('<p>' + calcMemoryString + '</p>').appendTo('.memory');
    }
 };
}

function DecimalToBinary(number){
    var binary = "";
    var temp = number;
 
    while(temp > 0){
        if(temp % 2 == 0){
            binary = "0" + binary;
        }
        else {
            binary = "1" + binary;
        }
        temp = Math.floor(temp / 2);
    }
    return binary;
}
