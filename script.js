var box = document.getElementById("display");

function addToScreen(x){
    box.value+=x;
    if(x=='C')
    {
        box.value="";
    }
}

function answer(){
    x=box.value;
    x=eval(x);
    box.value=x;
}

function backSpace(){
    var number= box.value;
    var len = number.length-1;
    var newNumber = number.substring(0,len);
    box.value=newNumber;
}

function squareRoot(){
    x=box.value;
    var sqrt = Math.sqrt(x);
    box.value = sqrt;
}

function power(y){
    x = box.value;
    x = Math.pow(x,y);
    box.value = x;
}

function abs(){
    x = box.value;
    x = Math.abs(x);
    box.value = x;
}

function ceil(){
    x=box.value;
    x=Math.ceil(x);
    box.value = x;
}

function floor(){
    x=box.value;
    x=Math.floor(x);
    box.value=x;
}

function exp(){
    x=box.value;
    x=Math.exp(x);
    box.value=x;
}

function log(){
    x=box.value;
    x=Math.log(x);
    box.value=x;
}

function round(){
    x=box.value;
    x=Math.round(x);
    box.value=x;
}



darkMode(counter) {
    if (counter % 2 != 0){
        cssheet.setAttribute("href", "dark.css");
    }else{
        cssheet.setAttribute("href", "style.css");
    }
}
const darkModeButton = document.querySelector("[data-daynight]");
darkModeButton.addEventListener("click", (button) => {
    counter++;
    calculator.darkMode(counter);
  });

