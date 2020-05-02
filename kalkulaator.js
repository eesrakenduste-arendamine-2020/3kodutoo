
function isInt(value) {
    letx = parseFloat(value);
    return !isNaN(value) && (x | 0) === x;
}

let sign = "";
let tempNr;

function displayItemFromHistory(sender){
    console.log(sender.toString());
    console.log(sender.innerHTML);
}

window.addEventListener("load", function(){

    let numbers="";

    let classes = ["key-number", "key-function"];

    let buttons = [
        ["+","-","x","÷"],
        ["√","-/+","^","AC"],
        ["7", "8", "9"],
        ["4", "5", "6"],
        ["1", "2", "3"],
        ["0", ".","="]

    ];


    for(let i = 0; i < buttons.length; i++) {
        numbers += "<br>";
        for(let j = 0; j < buttons[i].length; j++) {

            if(buttons[i][j] === "."){
                numbers += "<button class=\"key-number\" onclick='onNumberClick(this)' >"+buttons[i][j]+"</button>";
            }
            else if(buttons[i][j] === "="){
                numbers += "<button class=\"key-calculate\" onclick='calculateAnswer(this)' >"+buttons[i][j]+"</button>";
            }
            else if(isNaN(buttons[i][j])){
                numbers += "<button class=\"key-function\" onclick='onFunctionClick(this)' >"+buttons[i][j]+"</button>";
            }
            else{
                numbers += "<button class=\"key-number\" onclick='onNumberClick(this)' >"+buttons[i][j]+"</button>";
            }
        }
    }

    document.getElementById("calculator_keys").innerHTML = numbers;

});

function calculateAnswer() {
    console.log("VASTUS");
    let nr1 = parseFloat(document.getElementById("upper_numbers").innerHTML);
    let nr2 = parseFloat(document.getElementById("lower_numbers").innerHTML);



    if(isNaN(nr2)){
        nr2 = tempNr;
        console.log("null" + tempNr);
    }else{
        tempNr = nr2;
        console.log("tempnr "+ tempNr);
    }
    let answer;

    switch(document.getElementById("sign_label").innerHTML) {
        case "+":
            answer = nr1 + nr2;
            break;
        case "-":
            answer = nr1 - nr2;
            break;
        case "x":
            answer = nr1 * nr2;
            break;
        case "÷":
            answer = nr1 / nr2;
            break;
        case "^":
            answer = nr1 ** nr2;

            break;
    }

    document.getElementById("upper_numbers").innerHTML = answer.toString();
    document.getElementById("lower_numbers").innerHTML = "";

    let historyUL = document.getElementById("history");
    let historyLI = document.createElement("li");
    historyLI.addEventListener("click", displayItemFromHistory);



    console.log(historyUL.childElementCount);
    console.log(historyUL.firstElementChild);
    if(historyUL.childElementCount > 3){
        historyUL.firstElementChild.remove();
    }

    historyLI.onclick = function () {
        console.log(this.innerHTML);
    };

    historyLI.appendChild(document.createTextNode(nr1 + " "+ document.getElementById("sign_label").innerHTML + " " + nr2 + " = " + answer.toString()));

    historyUL.appendChild(historyLI);


    //document.getElementById("sign_label").innerHTML = "";

}

function onFunctionClick(sender){

    let upperValue = document.getElementById("lower_numbers").innerHTML;

    if(document.getElementById("lower_numbers").innerHTML !== "" && document.getElementById("upper_numbers").innerHTML !== "" && sender.innerHTML !== "-/+" && sender.innerHTML !== "AC"){
        calculateAnswer();
        sign = sender.innerHTML;
        //document.getElementById("upper_numbers").innerHTML = "";
        document.getElementById("sign_label").innerHTML = sign;
        console.log("A");
    }
    else{
        console.log("B");
        sign = sender.innerHTML;

        if(sender.innerHTML === "AC"){
            document.getElementById("lower_numbers").innerHTML = "";
            document.getElementById("upper_numbers").innerHTML = "";
            document.getElementById("sign_label").innerHTML = "";
        }
        else if(sender.innerHTML === "√"){

            document.getElementById("upper_numbers").innerHTML = Math.sqrt(parseFloat(upperValue));
            document.getElementById("lower_numbers").innerHTML = "";
            document.getElementById("sign_label").innerHTML = "";
        }
        else if(sender.innerHTML === "-/+") {
            console.log(upperValue);
            console.log(parseFloat(document.getElementById("lower_numbers").innerHTML) * -1);
            if(document.getElementById("lower_numbers").innerHTML !== ""){
                document.getElementById("lower_numbers").innerHTML = parseFloat(document.getElementById("lower_numbers").innerHTML) * -1;
            }else{
                document.getElementById("upper_numbers").innerHTML = parseFloat(document.getElementById("upper_numbers").innerHTML) * -1;
            }

            //document.getElementById("lower_numbers").innerHTML = "";
        }
        else if(sender.innerHTML === "=") {
            calculateAnswer();
        }
        else if(document.getElementById("lower_numbers").innerHTML === "" && document.getElementById("upper_numbers").innerHTML !== ""){
            //document.getElementById("upper_numbers").innerHTML = document.getElementById("lower_numbers").innerHTML;
            document.getElementById("lower_numbers").innerHTML = "";
            document.getElementById("sign_label").innerHTML = sender.innerHTML;
            console.log("SIIN1");
        }else{
            console.log("SIIN2");
            document.getElementById("upper_numbers").innerHTML = document.getElementById("lower_numbers").innerHTML;
            document.getElementById("lower_numbers").innerHTML = "";
            document.getElementById("sign_label").innerHTML = sender.innerHTML;
        }
    }

    console.log("FUNCTION");
}

function onNumberClick(sender){
    console.log("NUMBER");
    let previusContent = document.getElementById("lower_numbers").innerHTML;
    console.log(previusContent);
        /*
    if(document.getElementById("lower_numbers").innerHTML === ""){
        document.getElementById("lower_numbers").innerHTML = previusContent + sender.innerHTML;
    }*/

    if(sender.innerHTML !== "."){
        document.getElementById("lower_numbers").innerHTML = previusContent + sender.innerHTML;
    }else if(sender.innerHTML === "." && !previusContent.includes(".")){
        document.getElementById("lower_numbers").innerHTML = previusContent + "."
    }

}


