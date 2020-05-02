let repoButton = document.querySelector('#repo');
repoButton.addEventListener('click', ()=>{window.location.href="https://github.com/anetevlu/3kodutoo";});
 
function getHistory(){
	return document.getElementById("history-value").innerText;
}
function printHistory(num){
	document.getElementById("history-value").innerText=num;
}
function getOutput(){
	return document.getElementById("output-value").innerText;
}
function printOutput(num){
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
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
	return Number(num.replace(/,/g,''));
}
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history = history.substr(0,history.length-1);
				}
			}
			if(this.id == "square"){
				printHistory(output + "²");
				output *= output;				
				printOutput(output);
				var squareresult = getHistory() + " = " + output;
				historyList.push(squareresult);
				printAllHistory(historyList);
			}
			if(this.id == "root"){
				printHistory("√"+output);
				output = Math.sqrt(output);
				printOutput(output);
				var rootresult = getHistory() + " = " + output;
				historyList.push(rootresult);
				printAllHistory(historyList);
			}
			if(this.id == "cube"){
				printHistory(output + "³");
				output = output * output * output;
				printOutput(output);
				var cuberesult = getHistory() + " = " + output;
				historyList.push(cuberesult);
				printAllHistory(historyList);
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					var result=eval(history);
					printOutput(result);
					printHistory("");
					var finalresult = history + " = " + result;
					historyList.push(finalresult);
					printAllHistory(historyList);
				}
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){ //if output is a number
			output=output+this.id;
			printOutput(output);
		}
	});
}

var historyList = [];

function printAllHistory(array){
	document.getElementById('historytext').innerHTML = "<ul>";

	for(i = 0; i < array.length; i++){
		historytext.innerHTML += "<li>" + array[i] + "</li>";
	}

	historytext.innerHTML += "</ul>";
}
