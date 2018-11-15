$(document).ready(function () {
    // var startLoc = getStartLoc();
    // $("#startLoc").text("Start Location: " + startLoc);
    // if (document.cookie != "") {
    //     $("#startLoc").removeAttr("hidden");
    // }
    console.log("Cookies: " + document.cookie);
    // console.log("Started!");
    var startLoc = getCookie("startLoc");
    if (startLoc != null) {
        $("#startLoc").text("Start Location: " + startLoc);
        $("#startLoc").removeAttr("hidden");
        eraseCookie("startLoc");
    }
    var endLoc = getCookie("endLoc");
    if (endLoc != null) {
        $("#endLoc").text("End Location: " + endLoc);
        $("#endLoc").removeAttr("hidden");
        eraseCookie("endLoc");
    }


    $(".startButton").click(function() {
        $tr = $(this).parent().parent();
        
        var stopID = $tr.children(".stopNum").text();
        $("#startLoc").removeAttr("hidden");
        $("#startLoc").text("Start Location: " + stopID);

        setCookie("startLoc", stopID);
        
    });

    $(".endButton").click(function () {
        $tr = $(this).parent().parent();
        var stopID = $tr.children(".stopNum").text();
        $("#endLoc").removeAttr("hidden");
        $("#endLoc").text("End Location: " + stopID);
        addButton($("#startLoc"), $("#endLoc"));

        setCookie("endLoc", stopID);
    });
});

function tripFinderButton() {
    var labelText = $("#startLoc").text()
    var startID = labelText.slice(labelText.indexOf(": ") + 2);
    console.log(startID);
    setCookie("startLoc", startID);
    window.location.href = "/tripFinder";


}

function addButton($start, $end) {
    if ($start.text() != "Start Location:" && $end.text() != "End Location:") {
        var newButton = $("<input type='button' id='tripFinderButton' onclick='tripFinderButton();' class='btn btn-info' value='Go to Trip Finder'/>");
        $("#locations").append(newButton);
    }
}

// Cookie functions - Taken from Stack Overflow
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