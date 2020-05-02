function nightSwitch() {
   document.body.classList.toggle("dark-mode");
   document.getElementById("calculator").classList.toggle("dark-calculator");
   document.getElementById("empty1").classList.toggle("dark-dots");
   document.getElementById("empty2").classList.toggle("dark-dots");
   document.getElementById("container").classList.toggle("dark-picture");
   var night = document.getElementById("night");
   if(night.value=="night"){
	   night.innerText="Switch to light mode";
	   night.value="day";
   } else {
	   night.innerText="Switch to night mode";
	   night.value="night";
   }
}

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
function scientificCalculation(operator){
	var result;
	switch(operator){
		case sin: 
			result=Math.sin(getOutput());
			break;
		case cos: 
			result=Math.cos(getOutput());
			break;
		case tan: 
			result=Math.tan(getOutput());
			break;
		case log: 
			result=Math.log(getOutput());
			break;
		case power: 
			result=Math.pow(getOutput(), 2);
			break;
		case sqrt: 
			result=Math.pow(getOutput(), 0.5);
			break;
		case exp: 
			result=Math.exp(getOutput());
			break;
		case ln: 
			result=Math.ln(getOutput());
			break;
	}
	printOutput(result);
	printHistory("");
}
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else if(this.id=="sin"){
			scientificCalculation(sin);
		}
		else if(this.id=="cos"){
			scientificCalculation(cos);
		}
		else if(this.id=="tan"){
			scientificCalculation(tan);
		}
		else if(this.id=="log"){
			scientificCalculation(log);
		}
		else if(this.id=="power"){
			scientificCalculation(power);
		}
		else if(this.id=="sqrt"){
			scientificCalculation(sqrt);
		}
		else if(this.id=="exp"){
			scientificCalculation(exp);
		}
		else if(this.id=="ln"){
			scientificCalculation(ln);
		}
		else{
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					var result=eval(history);
					savePreviousCalculations(history, result);
					printOutput(result);
					printHistory("");
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
function savePreviousCalculations(calculation, result){
	document.getElementById("calculationsHeader").innerHTML = "<b>Eelmised kalkulatsioonid:</b>";
	document.getElementById("calculations").innerHTML += "<div style='margin-left: 2vw'>"+calculation+"="+result+"</div>";
	document.getElementById("calculationsButton").innerHTML = "<br><button onclick='deleteAllCalculations()' class='deleteButton'>Kustuta kõik kalkulatsioonid</button>";
}

function deleteAllCalculations(){
	document.getElementById("calculationsHeader").innerHTML = "";
	document.getElementById("calculations").innerHTML = "";
	document.getElementById("calculationsButton").innerHTML = "";
}