$(document).ready(function () {
    console.log($("#src").text())
    console.log($("#dest").text())
    var location = {"begin": $("#src").text(), "end": $("#dest").text()};
    console.log(JSON.stringify(location));
    var arrayOfLocations = getCookie("locations");
    var arrayStr = JSON.parse(arrayOfLocations);
    if (arrayStr == null) {
        arrayStr = [];
    }
    arrayStr.push(location);
    console.log(JSON.stringify(arrayStr));
    setCookie("locations", JSON.stringify(arrayStr)); 

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

//     $(".expandButton").click(function () {
//         if ($(this).attr("src") == "static/expand.png") {
//             $(this).attr("src", "static/collapse.png");
//             $trParent = $(this).parent().parent();
//             // $trParent.css("display", "table-row");
//             // $trParent.next().css("display", "table-row");
//             var index = $trParent.children("th").text();
//             $(".hidden" + index).css("display", "block");
//             $tbody = $(this).parent().parent().parent()
//             var i = 0;
//             $tbody.children("tr").each(function () {
//                 if (i != 0) {
//                     $(this).css("display", "table-row");
//                 }
//                 i++;
//             });

//         }
//         else {
//             $(this).attr("src", "static/expand.png");
//             $trParent = $(this).parent().parent();
//             // $trParent.css("display", "none");
//             $trParent.next().css("display", "none");
//             var index = $trParent.children("th").text();
//             $(".hidden" + index).css("display", "none");
//         }


//     });
