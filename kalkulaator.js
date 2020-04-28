
function isInt(value) {
    var x = parseFloat(value);
    return !isNaN(value) && (x | 0) === x;
}

let sign = "";

window.addEventListener("load", function(){

    let numbers="";

    let classes = ["key-number", "key-function"];

    let buttons = [
        ["+","-","x","÷"],
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["0", ".", "AC"]

    ];


    for(let i = 0; i < buttons.length; i++) {
        numbers += "<br>";
        for(let j = 0; j < buttons[i].length; j++) {


            if(isNaN(buttons[i][j])){
                numbers += "<button class=\"key-function\" data-action=\""+buttons[i][j]+"\" onclick='onFunctionClick(this)' >"+buttons[i][j]+"</button>";
            }
            else{
                numbers += "<button class=\"key-number\" data-action=\""+buttons[i][j]+"\" onclick='onNumberClick(this)' >"+buttons[i][j]+"</button>";
            }
        }
    }

    document.getElementById("calculator_keys").innerHTML = numbers;

});

function calculateAnswer() {
    let nr1 = parseFloat(document.getElementById("upper_numbers").innerHTML);
    let nr2 = parseFloat(document.getElementById("lower_numbers").innerHTML);
    let answer;

    if(sign === "+") {
       answer = nr1 + nr2;
    }
    else if(sign === "-") {
        answer = nr1 - nr2;
    }
    else if(sign === "x") {
        answer = nr1 * nr2;
    }
    else if(sign === "÷") {
        answer = nr1 / nr2;
    }

    document.getElementById("upper_numbers").innerHTML = answer.toString();
    document.getElementById("lower_numbers").innerHTML = "";
    document.getElementById("sign_label").innerHTML = "";

}

function onFunctionClick(sender){
    document.getElementById("upper_numbers").innerHTML = document.getElementById("lower_numbers").innerHTML;
    document.getElementById("lower_numbers").innerHTML = "";
    document.getElementById("sign_label").innerHTML = sender.innerHTML;
    sign = sender.innerHTML;
    console.log("FUNCTION");
}

function onNumberClick(sender){
    console.log("NUMBER");
    let previusContent = document.getElementById("lower_numbers").innerHTML;
    console.log(previusContent);
    document.getElementById("lower_numbers").innerHTML = previusContent + sender.innerHTML;
}


