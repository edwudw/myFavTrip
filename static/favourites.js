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
    console.log("hi");
    var arrayOfLocations = getCookie("locations");
    var arrayObject = JSON.parse(arrayOfLocations);
    for (var i = 0; i < arrayObject.length; i++) {
        $(".tbodyTable").append("<tr> <th scope='col'>" + i + "</th> <td>" + arrayObject[i].begin + "</td> <td>" + arrayObject[i].end + "</td> <td>Button1</td> <td>Button2</td> </tr>");
        
    }
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
