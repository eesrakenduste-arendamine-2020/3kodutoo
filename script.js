let fullHistory = [];

function pushToArray(data) {
    fullHistory.push(data);
}

function getHistory() {
    return document.getElementById("previousValue").innerText;
}

function printHistory(num) {
    document.getElementById("previousValue").innerText=num;
}

function getCurrent(num) {
    return document.getElementById("currentValue").innerText;
}

function printCurrent(num) {
    if(num=="") {
        document.getElementById("currentValue").innerText=num;
    } else {
        document.getElementById("currentValue").innerText=getFormattedNumber(num);
    }
}

function getFormattedNumber(num) {
    if(num=="-") {
        return "";
    }
    let n = Number(num);
    let value = n.toLocaleString("en");
    return value;
}

function reverseNumberFormat(num) {
    return Number(num.replace(/,/g,""));
}

let special = document.getElementsByClassName("special");
for(let i = 0; i < special.length; i++){
    special[i].addEventListener("click", function() {
        if(this.id == "DEL") {
            printHistory("");
            printCurrent("");
        } else if(this.id == "CE") {
            let current=reverseNumberFormat(getCurrent()).toString();
            if(current){
                current = current.substr(0, current.length-1);
                printCurrent(current);
            }
        } else {
            let current = getCurrent();
            let history = getHistory();
            if(current==""&&history!="") {
                if(isNaN(history[history.length-1])){
                    history = history.substr(0, history.length-1);
                }
            }
            if(current!="" || history!="") {
                current = current=="" ? current:reverseNumberFormat(getCurrent()).toString();
                history = history + current;
                if(this.id=="=") {
                    printCurrent("");
                    let result=eval(history);

                    if(checkDecimal(result) == false) {
                        savedHistory = history + " = " + result;    
                    } else {
                        savedHistory = history + " = " + result.toFixed(3);    
                    }

                    pushToArray(savedHistory);
                    printArray(fullHistory);
                    printCurrent(result);
                    printHistory("");
                } else if(this.id=="PI") {
                    let piResult = Math.PI;
                    if(checkDecimal(piResult) == false) {
                        piHistory = document.getElementById("PI").innerText + current + " = " + piResult;
                    } else {
                        piHistory = document.getElementById("PI").innerText + current + " = " + piResult.toFixed(3);
                    }
                    pushToArray(piHistory);
                    printArray(fullHistory);
                    printCurrent(piResult);
                } else if(this.id=="X2") {
                    let squareResult = current * current;
                    if(checkDecimal(squareResult) == false) {
                        squareHistory = current + "*" + current + " = " + squareResult;    
                    } else {
                        squareHistory = current + "*" + current + " = " + squareResult.toFixed(3);    
                    }
                    pushToArray(squareHistory);
                    printArray(fullHistory);
                    printCurrent(squareResult);
                } else if(this.id=="SQR") {
                    let rootResult = Math.sqrt(current);
                    if(checkDecimal(rootResult) == false) {
                        rootHistory = document.getElementById("SQR").innerText + current + " = " + rootResult;   
                    } else {
                        rootHistory = document.getElementById("SQR").innerText + current + " = " + rootResult.toFixed(3);   
                    }
                    pushToArray(rootHistory);
                    printArray(fullHistory);
                    printCurrent(rootResult);
                } else {
                    history = history + this.id;
                    printHistory(history);
                    printCurrent("");
            
                }
            }
        }
    })
}

function checkDecimal(num) {
    let result = (num-Math.floor(num)) !== 0;
    if(result) {
        return true;
    }else{
        return false;
    }
}

let number = document.getElementsByClassName("number");
for(let i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function(){
        let current = reverseNumberFormat(getCurrent());
        if(current != NaN) {
            current = current + this.id;
            printCurrent(current);
        }
    })
}

function printArray(array) {
    let text = document.getElementById("text"); 
    text.innerHTML = "<ul>";
    for(i = 0; i<array.length; i++) {
        text.innerHTML += "<li>" + array[i] + "</li>";
    }
    text.innerHTML += "</ul>"; 
}

$("#mode").click(changeMode);

function changeMode(){
    if($("#mode").html() == "Night"){
		$("#mode").html("Day");
		$("body").css({"background-color":"black"});
        $("button").css({"background-color":"yellow", "color":"black", "border":"1px solid orange"});
        $(".screen").css({"border":"3px solid orange"})
        $(".text").css({"color":"yellow", "border":"1px solid orange"});
        $(".history").css({"color":"yellow", "border":"2px solid orange"});
        $(".previous").css({"color":"orangered"});
        $(".current").css({"color":"orange"});
        
    }else{
		$("#mode").html("Night");
		$("body").css({"background-color":"lightgray"});
        let elements = document.getElementsByClassName("calculator");
        let numbers = document.getElementsByClassName("number");
        let special = document.getElementsByClassName("special");
        let remove = document.getElementsByClassName("remove");

        for(let i=0; i<elements.length; i++) {
            $(elements[i]).removeAttr("style");
        }

        for(let i=0; i<numbers.length; i++) {
            $(numbers[i]).removeAttr("style");
        }

        for(let i=0; i<special.length; i++) {
            $(special[i]).removeAttr("style");
        }

        for(let i=0; i<remove.length; i++) {
            $(remove[i]).removeAttr("style");
        }
    }
}

let repoContainer = document.querySelector("#repo");
repoContainer.addEventListener("click", ()=>{
    window.open("https://github.com/raiks01/3kodutoo");
});
