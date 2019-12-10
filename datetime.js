$(document).ready(function () {
    const date1 = new Date()
    var dateContent = $("<p>" + " (" + date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate() + ")" +
     "<br>" + "Time: " + date1.getHours() + ':' + date1.getMinutes() + "</p>")
    console.log(dateContent)
    $(".start").append(dateContent)
})
