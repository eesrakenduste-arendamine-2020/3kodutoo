
var completeHistory = [];

function pushToArray(data){
    completeHistory.push(data);
}

function getHistory(){
    return document.getElementById("history-value").innerText;
}

function printHistory(num){
    document.getElementById("history-value").innerText=num;
}

function getOutput(num){
    return document.getElementById("output-value").innerText;
}

function printOutput(num){
    if(num==""){
        document.getElementById("output-value").innerText=num;
    }else{
        document.getElementById("output-value").innerText=getFormattedNumber(num);
    }
}

function getFormattedNumber(num){
    if(num=="-"){
        return "";
    }
    var n = Number(num);
    var value = n.toLocaleString("en");
    return value;
}

function reverseNumberFormat(num){
    return Number(num.replace(/,/g,""));
}

var operator = document.getElementsByClassName("operator");
for(var i = 0; i < operator.length; i++){
    operator[i].addEventListener("click", function(){
        if(this.id == "clear"){
            printHistory("");
            printOutput("");
        }else if(this.id == "backspace"){
            var output=reverseNumberFormat(getOutput()).toString();
            if(output){ //if it has value
                output = output.substr(0, output.length-1);
                printOutput(output);
            }
        }else{
            var output = getOutput();
            var history = getHistory();
            if(output==""&&history!=""){
                if(isNaN(history[history.length-1])){
                    history = history.substr(0, history.length-1);
                }
            }
            if(output!="" || history!=""){
                output = output=="" ? output:reverseNumberFormat(getOutput()).toString();
                history = history + output;
                if(this.id=="="){
                    printOutput("");
                    var result=eval(history);

                    if(checkDecimal(result) == false){
                        var savedHistory = history + " = " + result;    
                    }else{
                        savedHistory = history + " = " + result.toFixed(3);    
                    }

                    pushToArray(savedHistory);
                    printArray(completeHistory);
                    printOutput(result);
                    printHistory("");
                }else if(this.id=="square"){
                    var squareResult = output * output;
                    if(checkDecimal(squareResult) == false){
                        var squareHistory = output + "*" + output + " = " + squareResult;    
                    }else{
                        squareHistory = output + "*" + output + " = " + squareResult.toFixed(3);    
                    }
                    pushToArray(squareHistory);
                    printArray(completeHistory);
                    printOutput(squareResult);
                }else if(this.id=="squareroot"){
                    var rootResult = Math.sqrt(output);
                    if(checkDecimal(rootResult) == false){
                        var rootHistory = document.getElementById("squareroot").innerText + output + " = " + rootResult;   
                    }else{
                        rootHistory = document.getElementById("squareroot").innerText + output + " = " + rootResult.toFixed(3);   
                    }
                    pushToArray(rootHistory);
                    printArray(completeHistory);
                    printOutput(rootResult);
                }else if(this.id=="division"){
                    var divisionResult = 1/output;
                    var divisionHistory = "1/" + output + " = " +divisionResult.toFixed(3);
                    pushToArray(divisionHistory);
                    printArray(completeHistory);
                    printOutput(divisionResult);
                }else{
                    history = history + this.id;
                    printHistory(history);
                    printOutput("");
            
                }
            }
        }
    })
}

function checkDecimal(num){
    var result = (num-Math.floor(num)) !== 0;
    if(result){
        return true;
    }else{
        return false;
    }
}

var number = document.getElementsByClassName("number");
for(var i = 0; i < number.length; i++){
    number[i].addEventListener("click", function(){
        var output = reverseNumberFormat(getOutput());
        if(output != NaN){ //if number
            output = output+this.id;
            printOutput(output);
        }
    })
}

$("#night").click(nightMode);

function nightMode(){
    if($("#night").html() == "Night"){
        $("#night").html("Day");
        $("#calculator").css({"background-color":"black"});
        $(".number").css({"background-color":"black", "color":"silver"});
        $("#name").css({"color":"silver"});
        $("#clear").css({"background-color":"gray","color":"black"});
        $("#backspace").css({"background-color":"gray", "color":"black"});
        $("button:nth-child(20)").css({"background-color":"gray", "color":"black"});
        $("#history-value").css({"color":"gray"});
        $("#output-value").css({"color":"silver"});
        
    }else{
        $("#night").html("Night");
        var elements = document.getElementsByClassName("calc");
        var numbers = document.getElementsByClassName("number");
        var operators = document.getElementsByClassName("operator");

        for (var i=0; i<elements.length; i++) {
            $(elements[i]).removeAttr("style");
        }

        for (var i=0; i<numbers.length; i++) {
            $(numbers[i]).removeAttr("style");
        }

        for (var i=0; i<operators.length; i++) {
            $(operators[i]).removeAttr("style");
        }
    }
}

let repoContainer = document.querySelector("#repo");
repoContainer.addEventListener("click", ()=>{
    window.open("https://github.com/SandraMai/3kodutoo");
});

function printArray(array){
    var text = document.getElementById("text"); 
    text.innerHTML = "<ul>";
    for(i = 0; i<array.length; i++){
        text.innerHTML += "<li>" + array[i] + "</li>";
    }
    text.innerHTML += "</ul>"; 
}
