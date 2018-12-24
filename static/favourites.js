$(document).ready(function () {
//    console.log($("#src").text())
//    console.log($("#dest").text())
//    var location = {"begin": $("#src").text(), "end": $("#dest").text()};
//    console.log(JSON.stringify(location));
//    var arrayOfLocations = getCookie("locations");
//    var arrayStr = JSON.parse(arrayOfLocations);
//    if (arrayStr == null) {
//        arrayStr = [];
//    }
//    arrayStr.push(location);
//    console.log(JSON.stringify(arrayStr));
//    setCookie("locations", JSON.stringify(arrayStr)); 
    var arrayOfLocations = localStorage.getItem("locations");
    var arrayObject = JSON.parse(arrayOfLocations);

    for (var i = 1; i <= arrayObject.length; i++) {
        $(".tbodyTable").append("<tr> <th scope='col'>" + i + "</th> <td id='begin'>" 
        + arrayObject[i].begin + "</td> <td id='end'>" + arrayObject[i].end + 
        "</td> <td><button type='button'\
         class='btn btn-success tripSetDepart'>Get Trip</button></td> \
         <td><button type='button' class='btn btn-success tripDepartNow'>Get Trip departing now</button></td> \
         <td>" + arrayObject[i].getName + "</td> \
         <td><button type='button' class='btn btn-danger deleteButton'>Delete</button></td></tr>");
        
    }
    $(".tripSetDepart").click(function () {
        var begin = $(this).parent().parent().children("#begin").text();
        var end = $(this).parent().parent().children("#end").text();
        setCookie("startLoc", begin);
        setCookie("endLoc", end);
        document.location.href = '/tripFinder';
    });

    $(".tripDepartNow").click(function () {
        var begin = $(this).parent().parent().children("#begin").text();
        var end = $(this).parent().parent().children("#end").text();
        setCookie("startLoc", begin);
        setCookie("endLoc", end);
        setCookie("departNow", "1");
        document.location.href = '/tripFinder';
    });

    $(".deleteButton").click(function () {
        var parent = $(this).parent().parent();
        var begin = parent.children("#begin").text();
        var end = parent.children("#end").text();

        var arrayOfLocations = localStorage.getItem("locations");
        var arrayObject = JSON.parse(arrayOfLocations);
        var newArray = [];
        for (var i = 0; i < arrayObject.length; i++) {
            if (arrayObject[i]["begin"] != begin || arrayObject[i]["end"] != end) {
                newArray.push(arrayObject[i]);
            }
        }
        localStorage.setItem("locations", JSON.stringify(newArray));

        parent.remove();

    });

});


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
