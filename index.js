let cycle = document.querySelector("#dayNight");
let melody = document.querySelector("#spaceCat");
let answer = document.querySelector(".textview");
let previousanswer = document.getElementById("recentSolution");
let previousNumber = null;
let colorMode = "White";
let songPlays = 0;
let isDots = 0;
let isNumbers = 0;
let isSigns = 0;
let calcNR=0;
let calculationM=0;
let mainCalc=0;
let calculations=[];
let typeCalc="";

function insert(num) {
  if (
    (num == "+" ||
      num == "/" ||
      num == "*" ||
      num == "^" ||
      num == "^2" ||
      num == "^") &&
    answer.value != "" &&
    previousanswer != null &&
    previousNumber != null &&
    previousNumber != "-" &&
    previousNumber != "." &&
    previousNumber != "/" &&
    previousNumber != "*" &&
    previousNumber != "+" &&
    previousNumber != "^"
  ) {
    answer.value = answer.value + num;
    isSigns = 1;
    isDots = 0;
  }
  if (
    num == "-" &&
    previousNumber != "-" &&
    previousNumber != "." &&
    previousNumber != "+"
  ) {
    answer.value = answer.value + num;
    isSigns = 1;
    isDots = 0;
  }
  if (num == "." && isNumbers == 1 && isDots == 0 && isSigns == 0) {
    answer.value = answer.value + num;
    isDots = 1;
    previousNumber = 0;
  } else {
    previousNumber = 0;
  }

  if (
    num == 1 ||
    num == 2 ||
    num == 3 ||
    num == 4 ||
    num == 5 ||
    num == 6 ||
    num == 7 ||
    num == 8 ||
    num == 9 ||
    num == 0
  ) {
    answer.value = answer.value + num;
    isNumbers = 1;
    isSigns = 0;
  }
  console.log(previousNumber);
  previousNumber = num;
}
function checkForErrors() {
  if (answer.value == Infinity && previousNumber != 0) {
    previousNumber = "";
    previousanswer.value = "∞";
    answer.value = "";
  } else if (answer.value == -Infinity && previousNumber != 0) {
    previousanswer.value = "-∞";
    answer.value = "";
    console.log();
  } else if (
    (answer.value == Infinity || answer.value == -Infinity) &&
    (previousNumber == 0 || previousNumber == -0)
  ) {
    previousanswer.value = "Can't divide with zero";
    answer.value = "";
  }
}
function resetDots() {
  isDots = 0;
  isNumbers = 0;
  isSigns = 0;
  previousNumber = "dot";
}

function calcSin() {
  typeCalc="Sinus  ";
  calculationM="SIN("+answer.value+")";
  equal();
  let exp = answer.value;
  exp = eval(Math.sin(exp));
  mainCalc=exp;
  console.log(exp);
  answer.value = exp;
  storeC(typeCalc,calculationM,mainCalc);
  addPreviousValue();
  resetDots();
  clean();
}
function calcCos() {
  typeCalc="Cosinus";
  calculationM="COS("+answer.value+")";
  equal();
  let exp = answer.value;
  exp = eval(Math.cos(exp));
  mainCalc=exp;
  console.log(exp);
  answer.value = exp;
  addPreviousValue();
  storeC(typeCalc,calculationM,mainCalc);
  resetDots();
  clean();
}
function calcTan() {
  typeCalc="Tangens";
  calculationM="TAN("+answer.value+")";
  equal();
  let exp = answer.value;
  exp = eval(Math.tan(exp));
  mainCalc=exp;
  console.log(exp);
  answer.value = exp;
  addPreviousValue();
  storeC(typeCalc,calculationM,mainCalc);
  resetDots();
  clean();
}
function calcSRoot() {
    typeCalc="Squareroot";
    calculationM="√ ("+answer.value+")";
    equal();
  if (answer.value>= 0) {
    let exp = answer.value;
    exp = Math.sqrt(exp);
    mainCalc=exp;
    console.log(exp);
    answer.value = exp;
    storeC(typeCalc,calculationM,mainCalc);
    addPreviousValue();
    resetDots();
    clean();
  } else {
    alert("Can't calculate squareroot of a negative value!");
  }
}

function calcPower2() {
    
  if (answer.value != "") {
    typeCalc="Power to 2"
    calculationM="("+answer.value+")^2";
    equal();
    let exp = answer.value;
    exp = Math.pow(exp, 2);
    mainCalc=exp;
    console.log(exp);
    answer.value = exp;
    storeC(typeCalc,calculationM,mainCalc);
    addPreviousValue();
    checkForErrors();
    resetDots();
    clean();
  }
}
function calcLog() {
  if (answer.value != "") {
    calculationM="Log("+answer.value+")";
        equal();
    if (answer.value > 0) {
      typeCalc="Logarithm";
      let exp = answer.value;
      exp = Math.log(exp);
      mainCalc=exp;
      console.log(exp);
      answer.value = exp;
      storeC(typeCalc,calculations,mainCalc);
      addPreviousValue();
      checkForErrors();
      clean();
    } else {
      alert("Can't do calculation of logarithm with numbers 0 or below");
      clean();
    }
  }
}

function addPreviousValue() {
  console.log("high");
  if (
    answer.value != NaN ||
    answer.value == Infinity ||
    answer.value == -Infinity ||
    previousanswer.value != "∞" ||
    previousanswer.value != "-∞"
  ) {
    previousanswer.value = answer.value;
    resetDots();
  } else {
    previousanswer.value = "Error";
    answer.value = "";
  }
}
function addPreviousValue2() {
  let exp = answer.value;
  let expLength = exp.length - 1;
  let lastone = exp.charAt(expLength);
  console.log(lastone);
  if (
    answer.value != null ||
    answer.value != NaN ||
    answer.value == Infinity ||
    answer.value == -Infinity ||
    previousanswer.value != "∞" ||
    previousanswer.value != "-∞"
  ) {
    if (
      previousanswer.value >= 0 &&
      answer.value != "" &&
      lastone != "-" &&
      lastone != "+" &&
      lastone != "." &&
      lastone != "*" &&
      lastone != "/" &&
      lastone != "^"
    ) {
      answer.value = answer.value + "+" + previousanswer.value;
    } else {
      answer.value = answer.value + previousanswer.value;
    }

    resetDots();
  } else {
    answer.value = answer.value + previousanswer.value + previousanswer;
    resetDots();
  }
}

function equal() {
  let exp = answer.value;
  let expLength = exp.length - 2;
  let expLength2 = exp.length - 1;
  let lastone1 = exp.charAt(expLength);
  let lastone2 = exp.charAt(expLength2);
  let combined = lastone1 + lastone2;
  console.log(combined);
  if (answer.value != "") {
    if (combined != "/0") {
      let exp = answer.value;
      let expfinal = exp.replace(/\^/g, "**");
      console.log(expfinal);
      if (expfinal) {
        answer.value = eval(expfinal);
        console.log(answer.value0);
      }
      addPreviousValue();
      checkForErrors();
      resetDots();
      previousNumber = "Answer";
    } else {
      alert("Cant divide by zero!");
    }
  } else {
    alert("Insert calculation!");
  }
}
function equalMain() {
    typeCalc="Arithmeric"
    let exp = answer.value;
    calculationM=exp;
    let expLength = exp.length - 2;
    let expLength2 = exp.length - 1;
    let lastone1 = exp.charAt(expLength);
    let lastone2 = exp.charAt(expLength2);
    let combined = lastone1 + lastone2;
    console.log(combined);
    if (answer.value != "") {
      if (combined != "/0") {
        let exp = answer.value;
        let expfinal = exp.replace(/\^/g, "**");
        console.log(expfinal);
        if (expfinal) {
          answer.value = eval(expfinal);
          mainCalc=answer.value;
          storeC(typeCalc,calculationM,mainCalc);
          console.log(calculations);
          console.log(answer.value0);
        }
        addPreviousValue();
        checkForErrors();
        resetDots();
        previousNumber = "Answer";
      } else {
        alert("Cant divide by zero!");
      }
    } else {
      alert("Insert calculation!");
    }
  }
function backspace() {
  previousNumber = "";
  let exp = answer.value;
  let expLength = exp.length - 1;
  let lastone = exp.charAt(expLength);
  console.log(lastone);
  if (lastone == ".") {
    isDots = 0;
  }
  answer.value = exp.substring(0, exp.length - 1);
  if (exp.length == 0) {
    previousNumber = null;
  }
}
function clean() {
  answer.value = "";
  previousNumber = null;
  resetDots();
}

function switchCycles() {
  let mode = document.getElementById("cycle");
  if (mode.value == "Turn on Night mode") {
    $("button").css("color", "white");
    $("button").css("background-color", "black");
    $("body").css("background-color", "#191970");
    $("p").css("color", "white");
    $("h1").css("color", "white");
    $("h3").css("color", "white");

    console.log(mode.value);
    mode.value = "Turn on Day mode";
    colorMode = "Black";
  } else {
    $("button").css("color", "white");
    $("h3").css("color", "#191970");
    $("button").css("background-color", "#191970");
    $("h1").css("color", "#191970");
    $("p").css("color", "#191970");
    console.log(mode.value);
    mode.value = "Turn on Night mode";
    colorMode = "White";
    $("body").css("background-color", "#FFFAF0");
  }
}



function updateApost() {
  if (aposthraphe == 0) {
    enablerCloser.disabled = true;
    $("#closerApost").css("background-color", "red");
  } else {
    enablerCloser.disabled = false;
    $("#closerApost").css("background-color", "white");
    // console.log(enablerCloser.disabled);
  }
}





function storeC(){
    calcNR+=1;
    let storedData=calcNR+" CALCULATION "+" | "+typeCalc+"| "+calculationM+" | Result: "+mainCalc+'<br/>';
    calculations.push(storedData);
    console.log(calculations);
    for(i=0;i<calculations.length;i++){
        document.getElementById("history").innerHTML=calculations;
    }
}
cycle.addEventListener("click", switchCycles);
previousanswer.addEventListener("click", addPreviousValue2);