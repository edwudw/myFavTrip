// $(document).ready(function () {
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




// });