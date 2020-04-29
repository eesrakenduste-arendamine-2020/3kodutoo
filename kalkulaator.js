
function isInt(value) {
    var x = parseFloat(value);
    return !isNaN(value) && (x | 0) === x;
}

let sign = "";
let tempNr;

window.addEventListener("load", function(){

    let numbers="";

    let classes = ["key-number", "key-function"];

    let buttons = [
        ["+","-","x","÷","√","-/+"],
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
        ["0", ".", "AC"]

    ];


    for(let i = 0; i < buttons.length; i++) {
        numbers += "<br>";
        for(let j = 0; j < buttons[i].length; j++) {

            if(buttons[i][j] === "."){
                numbers += "<button class=\"key-number\" data-action=\""+buttons[i][j]+"\" onclick='onNumberClick(this)' >"+buttons[i][j]+"</button>";
            }
            else if(isNaN(buttons[i][j])){
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

    if(sign === "+") {
        console.log(nr1 + " + " + nr2);
       answer = nr1 + nr2;
    }
    else if(sign === "-") {
        answer = nr1 - nr2;
        console.log(nr1 + " - " + nr2);
    }
    else if(sign === "x") {
        answer = nr1 * nr2;
        console.log(nr1 + " x " + nr2);
    }
    else if(sign === "÷") {
        answer = nr1 / nr2;
        console.log(nr1 + " / " + nr2);
    }

    document.getElementById("upper_numbers").innerHTML = answer.toString();
    document.getElementById("lower_numbers").innerHTML = "";
    //document.getElementById("sign_label").innerHTML = "";

}

function onFunctionClick(sender){

    let upperValue = document.getElementById("lower_numbers").innerHTML;

    if(document.getElementById("lower_numbers").innerHTML !== "" && document.getElementById("upper_numbers").innerHTML !== "" && sender.innerHTML !== "-/+"){
        calculateAnswer();
        sign = sender.innerHTML;
        //document.getElementById("upper_numbers").innerHTML = "";
        document.getElementById("sign_label").innerHTML = sign;
        console.log("A");
    }
    else if(document.getElementById("lower_numbers").innerHTML !== "" && document.getElementById("upper_numbers").innerHTML !== ""){

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
            document.getElementById("lower_numbers").innerHTML = parseFloat(upperValue) * -1;
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
    if(sender.innerHTML !== "."){
        document.getElementById("lower_numbers").innerHTML = previusContent + sender.innerHTML;
    }else if(sender.innerHTML === "." && !previusContent.includes(".")){
        document.getElementById("lower_numbers").innerHTML = previusContent + "."
    }

}


