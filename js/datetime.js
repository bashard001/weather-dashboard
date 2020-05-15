$(document).ready(function () {
    function updatetime(){
    const date1 = new Date()
    var hours = date1.getHours()
    var minutes = date1.getMinutes()
    var seconds = date1.getSeconds()
    var ampm;
    if (hours > 12){
        hours -= 12;
        ampm = " pm";
    } else{
        ampm = " am"
    }
    if (minutes < 10){
        minutes = "0"+date1.getMinutes()
    }
    
    var dateContent = $("<p>" + " (" + date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate() + ")" +
     "<br>" + "Time: " + hours + ':' + minutes + ':'+ seconds + ampm + "</p>")
    $(".start").html(dateContent)
}
setInterval(updatetime,1000)
})
