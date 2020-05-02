let melody = document.querySelector("#NightMode");
melody.addEventListener('click', nightmode);


function myclick(a) {
    let number = parseInt(a)

    if (myform.display.value.slice(-1) === a) {
        if (Number.isInteger(number)) {
            myform.display.value += a
        } else alert("Can't put a double")
    } else if (Number.isInteger(number)) {
        myform.display.value += a
    } else myform.display.value += a
}

function addHistroy(answer, v1) {
    console.log("VASTUS")
    var node = document.createElement("div")
    node.setAttribute("Class", "history-elements")
    var textnode = document.createTextNode(answer + "=" + v1)
    node.appendChild(textnode)
    document.getElementById("history").appendChild(node)
}

function equal() {
    const answer = myform.display.value.toString()
    var exp = myform.display.value;
    if (exp) {
        myform.display.value = eval(exp);
    }
    addHistroy(answer, myform.display.value)
}

function ac() {
    myform.display.value = "0";
}

function backspace() {
    var exp = myform.display.value;
    myform.display.value = exp.substr(0, exp.length - 1);
}

function sin() {
    myform.display.value = Math.sin(myform.display.value);
}

function cos() {
    myform.display.value = Math.cos(myform.display.value);
}

function tan() {
    myform.display.value = Math.tan(myform.display.value);
}

function square() {
    myform.display.value = Math.pow(myform.display.value, 2);
}

function squarert() {
    myform.display.value = Math.pow(myform.display.value, 1 / 2);
}

function abs() {
    myform.display.value = Math.abs(myform.display.value);
}

window.onload = function () {
    document.getElementById("my_audio").play();
}

function nightmode() {

    var music = document.getElementById("night");
    var creepy = document.getElementById("myMusic");
    var ketsup = document.getElementById("music");
    var elements = document.getElementById("back-grnd")

    if (music.value == "Night Mode") {
        creepy.play();
        ketsup.pause();
        music.value = "Day Mode";
        elements.className = "bg-night";
        console.log('[info] Night mode');
    } else {
        ketsup.play();
        creepy.pause();
        console.log(music.value)
        music.value = "Night Mode";
        elements.className = "bg-day";
        console.log('[info] Day mode');
    }
}
