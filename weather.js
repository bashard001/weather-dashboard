var apiKey = "03e24d7d731fc83efc64f5aa4eb937c1";

var city = '';
var date = new Date()

$("button").on("click", function () {
  var caContent = $("#get-weather")

  var letsGo = caContent.val()
  city = letsGo




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
      + " (" + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ")") ;
      city.append(( "<img id='wicon' src='' alt='Weather icon'>"));
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".humidity").text("Humidity: " + response.main.humidity);
      $(".temp").text("Temperature (F) " + ((response.main.temp - 273.15) * 1.80 + 32).toFixed(2));
      $('#wicon').attr('src', iconurl);


      // Converts the temp to Kelvin with the below formula



      // Log the data in the console as well
      console.log("Wind Speed: " + response.wind.speed);
      console.log("Humidity: " + response.main.humidity);
      console.log("Temperature (F): " + response.main.temp);
    });

    
    
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function (response2) {
        

        console.log(response2)

        console.log(response2.list.length)

        for (var i = 0; i < response2.list.length; i +=8){
          var nextFive = $(".five")
          var nextFiveCard = $("<div>")
          var tempDate =response2.list[i].dt_txt
          console.log(tempDate.substring(0, 10))
          nextFiveCard.append($("<h3>" + response2.list[i].main.temp + "</h3>"))
          nextFiveCard.append($("<h3>" + tempDate.substring(0, 10) + "</h3>"))
          
          nextFive.append(nextFiveCard)


          


        }

      })
})



