var apiKey = "03e24d7d731fc83efc64f5aa4eb937c1";

var city = '';
var date = new Date()
var longitude = "";
var latitude = "";

function pastSearchHistory(){

  var pastSearch = localStorage.getItem("pastSearch")
  if (pastSearch !== null){
    city = pastSearch;
    var reachHistoryList = $("<div class='historylist'>" + pastSearch + "</div>")
    $(".search-data").append(reachHistoryList)

      savedHistory = pastSearch.split(",")
    for (var i = 0; i < savedHistory.length; i++){
      letsGo.push(savedHistory[i])
    }
    
  }

}


function currentlocationWeather() {
  navigator.geolocation.getCurrentPosition(function (position) {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;
    console.log(longitude)
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        console.log(response)
        var iconcode = response.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

        // Log the queryURL
        console.log(queryURL);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        var city = $(".city").html("<strong>" + "Current location: " + response.name + "</strong>"
          + " (" + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ")");
        city.append(("<img id='wicon' src='' alt='Weather icon'>"));
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);
        $(".temp").text("Temperature (F) " + ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2));
        $('#wicon').attr('src', iconurl);

      })

  });
}
currentlocationWeather()

pastSearchHistory()


function displayResults(){

  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

  // Here we run our AJAX call to the OpenWeatherMap API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response) {

      var iconcode = response.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

      // Log the queryURL
      console.log(queryURL);

      // Log the resulting object
      console.log(response);

      // Transfer content to HTML
      var city = $(".city").html("<strong>" + response.name + "</strong>"
        + " (" + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ")");
      city.append(("<img id='wicon' src='' alt='Weather icon'>"));
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".humidity").text("Humidity: " + response.main.humidity + "%");
      $(".temp").text("Temperature (F) " + ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2));
      $('#wicon').attr('src', iconurl);

    });



  var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // We store all of the retrieved data inside of an object called "response"
    .then(function (response2) {

      console.log(response2)

      for (var i = 2; i < response2.list.length; i += 8) {
        var iconcode2 = response2.list[i].weather[0].icon;
        var iconurl2 = "http://openweathermap.org/img/w/" + iconcode2 + ".png";

        $(".five-day").text("Five day forecast:")
        var nextFive = $(".five")
        var nextFiveCard = $("<div>")
        nextFiveCard.attr("class", "col style")
        var tempDate = response2.list[i].dt_txt

        nextFiveCard.append($("<h5>" + 'Date: ' + tempDate.substring(0, 10) + "</h5>"))
        nextFiveCard.append(("<img id='wicon2' src='' alt='Weather icon'>"))
        $('#wicon2').attr('src', iconurl2)
        nextFiveCard.append($("<h6>" + "Temp: " + ((response2.list[i].main.temp - 273.15) * 1.80 + 32).toFixed(2) + "</h6>"))
        nextFiveCard.append(("<h6>" + "Humidity: " + response2.list[i].main.humidity + "%" ))

        nextFive.append(nextFiveCard)

      }

    })


}

var letsGo = [];

$("button").on("click", function () {
  var caContent = $("#get-weather")
  
  city = caContent.val()
   console.log(city)
   letsGo.push(city)


  localStorage.setItem("pastSearch", letsGo)

  displayResults()

  
})



