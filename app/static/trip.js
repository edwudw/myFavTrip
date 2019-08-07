$(document).ready(function () {
    console.log("Cookies: " + document.cookie);

    var startLoc = getCookie("startLoc");
    if (startLoc != null) {
        $("#departBox").val(startLoc);
        setCookie("startLoc", null);
    }
    var endLoc = getCookie("endLoc");
    if (endLoc != null) {
        $("#arriveBox").val(endLoc);
        setCookie("endLoc", null);

    }

    if (getCookie("departNow") == 1) {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        var date = yyyy + '-' + mm + '-' + dd;
        $("#dateBox").val(date);
        var hh = today.getHours();
        var MM = today.getMinutes();
        var time = hh + ':' + MM;
        $("#timeBox").val(time);
        setCookie("departNow", "0");
    }



});

function getStopName(name) {
    var returnValue = "";
    $.ajax({
        type : 'POST',
        url : "/getStopID",
        data : name,
        async: false,
        success: function(data) {
            returnValue = data;
            console.log(returnValue);
        }
    });
    return returnValue;
}

function submitForm() {
    
    var name = getCookie("fromStopFinder");
    if (name == null) {
        name = "False";
    }
    if (name == "True") {
        var location = {"begin": $("#departBox").val(), "end": $("#arriveBox").val(), "getName": name,
                        "beginName": getStopName($("#departBox").val()), "endName": getStopName($("#arriveBox").val()) };
    }
    var location = {"begin": $("#departBox").val(), "end": $("#arriveBox").val(), "getName": name};
    setCookie("fromStopFinder", "False");
    var arrayOfLocations = localStorage.getItem("locations");
    var arrayStr = JSON.parse(arrayOfLocations);
    if (arrayStr == null) {
        arrayStr = [];
    }
    arrayStr.push(location);
    localStorage.setItem("locations", JSON.stringify(arrayStr)); 

}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}

