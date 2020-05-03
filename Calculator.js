

function insert(num){
    document.form.textview.value = document.form.textview.value + num;
}

function clean() {
    document.form.textview.value = "";
}

function back() {
    var exp = document.form.textview.value;
    document.form.textview.value = exp.substring(0, exp.lenght-1);
}

function eq() {
    var exp = document.form.textview.value;
    if(exp){
        document.form.textview.value = eval(exp);
    }
}

function sin(){
    var exp = document.form.textview.value;
    if(exp){
        document.form.textview.value = Math.sin(exp);
    }
}

function cos(){
    var exp = document.form.textview.value;
    if(exp){
        document.form.textview.value = Math.cos(exp);
    }
}

function tan(){
    var exp = document.form.textview.value;
    if(exp){
        document.form.textview.value = Math.tan(exp);
    }
}

function sqrt(){
    var exp = document.form.textview.value;
    if(exp){
        document.form.textview.value = Math.sqrt(eval(exp));
    }
}

function pow(){
    var exp = document.form.textview.value;
    if(exp){
        document.form.textview.value = Math.pow(eval(exp), 2);
    }
}