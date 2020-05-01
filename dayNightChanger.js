function changeStyle(){

    let checkBox = document.getElementById("daynightbutton");

    if (checkBox.checked === true){
        document.getElementById('currentCss').href='day.css';
        console.log("1");
    } else {
        console.log("0");
        document.getElementById('currentCss').href='night.css';
    }
}