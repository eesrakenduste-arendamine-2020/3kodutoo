function insrt(num) {
	$('.calc-display').val($('.calc-display').val() + num);
}
function eql() {
	$('.calc-display').val(eval($('.calc-display').val()));
}
function c() {
	$('.calc-display').val('');
}
function del() {
	value = $('.calc-display').val();
	$('.calc-display').val(value.substring(0, value.length - 1));
}

function darkMode() {
   var element = document.body;
   element.classList.toggle("dark-mode");
}

function makeTang() {
  form.display.value=Math.tan(form.display.value);
}

function makeCos() {
  form.display.value=Math.tan(form.display.value);
}

function makeSin() {
  form.display.value=Math.tan(form.display.value);
}

function square() {
  form.display.value=Math.pow(form.display.value,2);
}

