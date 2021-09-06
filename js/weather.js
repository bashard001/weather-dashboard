var apiKey = "03e24d7d731fc83efc64f5aa4eb937c1";
var city = '';
var date = new Date()
var longitude = "";
var latitude = "";
var letsGo = [];
var tempkind = "F";


$(".temptype").on("click", function () {
  switch (tempkind) {
    case "F":
      tempkind = "C";
      $(".temptype").html("<p class='btn btn-primary'>" + "Change to &#176F" + "</p>")
      break;
    case "C":
      tempkind = "F";
      $(".temptype").html("<p class='btn btn-primary'>" + "Change to &#176C" + "</p>")
      break;
  }
  if (city == "") {
    currentlocationWeather()
  }
  else {
    displayResults()
  }
})


function pastSearchHistory() {
  letsGo = []
  var pastSearch = localStorage.getItem("pastSearch")
  if (pastSearch !== null) {

    for (var i = 0; i < pastSearch.length; i++) {

      var savedHistory = pastSearch.split(",").reverse()
      console.log(savedHistory)

      if (i < 3 && savedHistory[i] !== undefined) {
        var reachHistoryList = $("<div class='historylist' city=" + savedHistory[i].replace(" ", "-") + ">" + savedHistory[i] + "</div>")


        $(".search-data").append(reachHistoryList)

        letsGo.push(savedHistory[i])
      }
    }
  }
}


function currentlocationWeather() {
  navigator.geolocation.getCurrentPosition(function (position) {
    //pulling client location
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {

        var iconcode = response.weather[0].icon;
        var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";

        // Transfer content to HTML
        var city = $(".city").html("<strong>" + "Current location: " + response.name + "</strong>"
          + " (" + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ")");
        city.append(("<img id='wicon' src='' alt='Weather icon'>"));
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity);

        if (tempkind == "F") {
          $(".temp").text("Temperature (F) " + ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2));
        }
        else { $(".temp").text("Temperature (C) " + (response.main.temp - 273.15).toFixed(2)); }
        $('#wicon').attr('src', iconurl);

        if (tempkind == "F") {
          $(".temptype").html("<p class='btn btn-primary'>" + "Change to &#176C" + "</p>")
        }
        else {
          $(".temptype").html("<p class='btn btn-primary'>" + "Change to &#176F" + "</p>")
        }
      })
  });
}
currentlocationWeather()

pastSearchHistory()


function displayResults() {

  if (city !== "") {

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

        // Transfer content to HTML
        var city = $(".city").html("<strong>" + response.name + "</strong>"
          + " (" + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ")");
        city.append(("<img id='wicon' src='' alt='Weather icon'>"));
        $(".wind").text("Wind Speed: " + response.wind.speed);
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        
        if (tempkind == "F") {
          $(".temp").text("Temperature (F) " + ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2));
        }
        else { $(".temp").text("Temperature (C) " + (response.main.temp - 273.15).toFixed(2)); }
        $('#wicon').attr('src', iconurl);

      });


// query weather data
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function (response2) {

        var nextFive = $(".five")
        nextFive.empty()

        for (var i = 2; i < response2.list.length; i += 8) {
          var iconcode2 = response2.list[i].weather[0].icon;
          var iconurl2 = "http://openweathermap.org/img/w/" + iconcode2 + ".png";
          console.log(iconcode2)
          $(".five-day").text("Five day forecast:")

          var nextFiveCard = $("<div>")
          nextFiveCard.attr("class", "col-md col-xm-6 style")
          var tempDate = response2.list[i].dt_txt

          nextFiveCard.append($("<h5>" + 'Date: ' + tempDate.substring(0, 10) + "</h5>"))

          nextFiveCard.append(("<img id='wicon2' src=" + iconurl2 + " alt='Weather icon'>"))

          if (tempkind == "F") {
            nextFiveCard.append($("<h6>" + "Temp: " + ((response2.list[i].main.temp - 273.15) * 1.80 + 32).toFixed(2) + " &#176F" + "</h6>"))
          }
          else { nextFiveCard.append($("<h6>" + "Temp: " + (response2.list[i].main.temp - 273.15).toFixed(2) + " &#176C" + "</h6>")) }

          nextFiveCard.append(("<h6>" + "Humidity: " + response2.list[i].main.humidity + "%"))

          nextFive.append(nextFiveCard)

        }
      })
  }
}

// when keypressing enter; searching and displaying searched city weather
$(document).on('keypress', function (e) {
  if (e.which == 13) {
    doSearch();
  }
});

function doSearch() {
  var caContent = $("#get-weather")

  city = caContent.val()

  if (letsGo.includes(city) || city == "") {
    localStorage.setItem("pastSearch", letsGo)

  } else {
    letsGo.push(city)

    localStorage.setItem("pastSearch", letsGo)
    var addHistoryList = $("<div class='historylist' city=" + city.replace(" ", "-") + ">" + city + "</div>")

    $(".search-data").append(addHistoryList)
  }
  console.log(letsGo)

  displayResults()
  clickToGet()
}

// searching and displaying searched city weather
$("button").on("click", doSearch)

function clickToGet() {
  $(".historylist").on("click", function () {

    var clickCity = $(this).attr("city")
    city = clickCity.replace("-", " ")
    displayResults()

  })
}
clickToGet()