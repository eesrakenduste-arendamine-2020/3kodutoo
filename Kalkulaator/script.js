function insert(num) {
  document.form.textview.value = document.form.textview.value + num;
}

function equal() {
  var exp = document.form.textview.value;
  if (exp) {
    document.form.textview.value = eval(exp);
    var p = document.createElement("p");
    p.innerHTML = exp;
    historyValue.appendChild(p);
    p.append(" = ", eval(exp));
  }
}

function squared() {
  var exp = document.form.textview.value;
  document.form.textview.value = exp * exp;
}

function cubed() {
  var exp = document.form.textview.value;
  document.form.textview.value = exp * exp * exp;
}

function back() {
  var exp = document.form.textview.value;
  document.form.textview.value = exp.slice(0, -1);
}

function clearAll() {
  var exp = document.form.textview.value;
  document.form.textview.value = exp.substring(0, exp.lenght - 1);
}

function isOdd(num) {
  return num % 2;
}

var timesClickedBraces = 0;

$("#braces").click(function () {
  timesClickedBraces++;

  if (isOdd(timesClickedBraces)) {
    insert("(");
  } else {
    insert(")");
  }
});

var timesClickedbg = 1;

$("#bg").click(function () {
  timesClickedbg++;
  if (isOdd(timesClickedbg)) {
    this.value = "Vaheta öörežiimi peale";
    document.body.style.background = "linear-gradient(to right, green, blue)";
    document.getElementById("historyValue").style.color = "black";
    document.getElementById("nameTag").style.color = "black";
  } else {
    document.body.style.background =
      "linear-gradient(to right, black, rgb(34,34,34))";
    document.getElementById("historyValue").style.color = "white";
    document.getElementById("nameTag").style.color = "white";
    this.value = "Vaheta päevarežiimi peale";
  }
});

var input = document.getElementById("textview");
input.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("eqbtn").click();
  }
});
