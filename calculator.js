$(document).ready(function() {
    let eq = "";
    let curNumber="";
    let result = "";
    let entry = "";
    let reset = false;
    let history = [];
    let pow = false;

    $("button").click(function() {
        entry = $(this).attr("value");

        if (entry === "ac") {
            entry=0;
            eq=0;
            result=0;
            curNumber=0;
            $('#result p').html(entry);
            $('#previous p').html(eq);
        }

        else if (entry === "ce") {
            if (eq.length > 1) {
                eq = eq.slice(0, -1);
                $('#previous p').html(eq);
            }
            else {
                eq = 0;
                $('#result p').html(0);
            }

            $('#previous p').html(eq);

            if (curNumber.length > 1) {
                curNumber = curNumber.slice(0, -1);
                $('#result p').html(curNumber);
            }
            else {
                curNumber = 0;
                $('#result p').html(0);
            }

        }
        else if(entry === "<sup>^</sup>"){
            pow = true;
            $('#previous p').html(eq+"<sup>^</sup>");
            $('#result p').html(curNumber);
            eq += entry;
        }

        else if (entry === "=") {
            if(pow === true){
                let numbers= eq.split('<sup>^</sup>');
                result = Math.pow(numbers[0], numbers[1]);
                $('#result p').html(result);
                $('#previous p').html(eq + "=");
                if (history.length >= 4) {
                    history.shift();
                }
                history.push({
                    "previous": eq,
                    "result": result
                });
                eq = result;
                entry = result;
                curNumber = result;
                reset = true;
                $('#history').empty()
                history.forEach((item) => {
                    $("#history").prepend('<li class="list-group-item">' + item["previous"] + "=" + item["result"] + '</li>');
                })
                pow = false;

            } else {
                result = eval(eq);
                $('#result p').html(result);
                $('#previous p').html(eq + "=");
                if (history.length >= 4) {
                    history.shift();
                }
                history.push({
                    "previous": eq,
                    "result": result
                });
                eq = result;
                entry = result;
                curNumber = result;
                reset = true;
                $('#history').empty()
                history.forEach((item) => {
                    $("#history").prepend('<li class="list-group-item">' + item["previous"] + "=" + item["result"] + '</li>');
                })
            }
        }

        else if(entry === "<sup>2</sup>"){
            result = eq * eq;
            $('#result p').html(result);
            $('#previous p').html(eq+"<sup>2</sup>" + "=");
            if(history.length >= 4){
                history.shift();
            }
            history.push({
                "previous": eq + "<sup>2</sup>",
                "result": result
            });
            eq = result;
            entry = result;
            curNumber = result;
            reset = true;

            $('#history').empty()
            history.forEach((item)=>{
                $("#history").prepend('<li class="list-group-item">'+ item["previous"] +"="+item["result"] + '</li>');
            })
        }

        else if(entry === "√()"){
            result = Math.sqrt(eq);
            $('#result p').html(result);
            $('#previous p').html("√("+ eq +")" + "=");
            if(history.length >= 4){
                history.shift();
            }
            history.push({
                "previous": "√("+ eq +")",
                "result": result
            });
            eq = result;
            entry = result;
            curNumber = result;
            reset = true;

            $('#history').empty()
            history.forEach((item)=>{
                $("#history").prepend('<li class="list-group-item">'+ item["previous"] +"="+item["result"] + '</li>');
            })
        }

        else if (isNaN(entry)) {
            if (entry !== ".") {
                reset = false;
                if (curNumber === 0 || eq === 0) {
                    curNumber = 0;
                    eq = entry;
                }
                else {
                    curNumber = "";
                    eq += entry;
                }
                $('#previous p').html(eq);
            }
            else if (curNumber.indexOf(".") === -1) {
                reset = false;
                if (curNumber === 0 || eq === 0) {
                    curNumber = 0.;
                    eq = 0.;
                }
                else {
                    curNumber += entry;
                    eq += entry;
                }
                $('#result p').html(curNumber);
                $('#previous p').html(eq);
            }
        }

        else {
            if (reset) {
                eq = entry;
                curNumber = entry;
                reset = false;
            }
            else {
                eq += entry;
                curNumber += entry;
            }
            $('#previous p').html(eq);
            $('#result p').html(curNumber);
        }

        if (curNumber.length > 10 || eq.length > 26) {
            $("#result p").html("0");
            $("#previous p").html("Too many digits");
            curNumber ="";
            eq="";
            result ="";
            reset=true;
        }

    });


});