$(document).ready(function () {
    const date1 = new Date()
    var hours = date1.getHours()
    var ampm;
    if (hours > 12){
        hours -= 12;
        ampm = " pm";
    } else{
        ampm = " am"
    }
    var dateContent = $("<p>" + " (" + date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate() + ")" +
     "<br>" + "Time: " + hours + ':' + date1.getMinutes() + ampm + "</p>")
    console.log(dateContent)
    $(".start").append(dateContent)
})
