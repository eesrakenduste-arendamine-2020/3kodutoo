var final_value = "0";
let first_number = 0;

//vaatab mis on nupu valu kuhu vajutatakse
document.getElementById("calculator_box").onclick = button;
function button(e) {
    console.log(first_number);
    var button_value = (e.target.value);
    final_value += button_value;
    document.getElementById("insert_number").value = final_value;
    }

//vaatab mis tehet tehti ja teeb seda peale nupu vajutamist
function check(){

    var string_length = final_value.length;
    var last = final_value.charAt(string_length);
    var res = final_value.charAt(0);
   

    if(res == "+"){
        final_value = final_value.replace("+", "");
        addNumbers();
    }else if(res == "-"){
        final_value = final_value.replace("-", "");
        removeNumbers();
    }else if(res == "x"){
        final_value = final_value.replace("x", "");
        multiplyNumbers();
    }else if(res == "÷"){
        final_value = final_value.replace("÷", "");
        divideNumbers();
    }else if(res == "√"){
        final_value = final_value.replace("√", "");
        squareRootNumbers();
    }else{
        var convert = parseFloat(final_value);
        first_number += convert;
        final_value = last;
    }
}

//liitminbe
function addNumbers(){
    var convert = parseFloat(final_value);
    first_number += convert;
    final_value = "";
}

//lahutamine
function removeNumbers(){
    var convert = parseFloat(final_value);
    first_number -= convert;
    final_value = "";
}

//korrutamine
function multiplyNumbers(){
    var convert = parseFloat(final_value);
    first_number *= convert;
    final_value = "";
}

//jagamine
function divideNumbers(){
    var convert = parseFloat(final_value);
    first_number /= convert;
    final_value = "";
}

//ruutjuur
function squareRootNumbers(){
    var convert = parseFloat(final_value);
    first_number += Math.sqrt(convert);
    final_value = "";
}

//puhastab valja
function clear_all(){
    final_value = "";
    first_number = 0;
}

//Väljastab lõpliku arvu 
function all_sum(){
    check();
    var res = final_value.charAt(0);
    final_value = final_value.replace(res, "");
    final_value = first_number;
    
}

//disaini muutmine

document.getElementById("theme_button").addEventListener("click", function() {
    //nupp ja bar
    this.classList.toggle("changed");
    //document.getElementById("theme_button").innerHTML = "W";
    document.getElementById("bar").classList.toggle("changed");

    document.getElementById("calculator_box").classList.toggle("changed");
    document.body.classList.toggle("changed");
  });

