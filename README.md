# weather-dashboard
To access this site go to:
https://bashard001.github.io/weather-dashboard

This is a weather dashboard application with search functionality to find current weather conditions and the future weather outlook for multiple cities.

#User story
As a traveler
I want to see the weather outlook for multiple cities
so that I can plan a trip accordingly

## Application workings

* Used the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities.

* Used AJAX to hook into the API to retrieve data in JSON format.

* The app runs in the browser and feature dynamically updated HTML and CSS powered by jQuery.

* Displays the following under current weather conditions:

  * City

  * Date

  * Icon image (visual representation of weather conditions)

  * Temperature

  * Humidity

  * Wind speed

  * UV index

* Includes a search history that users can access their past search terms. Clicking on the city name should perform a new search that returns current and future conditions for that city. 

* After searching for a city, the following information is displayed:

  *  Current temperature

  *  Current humidity

  *  Windspeed

  *  Uv index

  *  5 day forecast

* Application uses icons to represent weather conditions.

* Application stores previously searched for cities in localstorage and displays them to the user.

* Application loads last searched city forecast on page load.


## Weather API
Developers are often tasked with retrieving data from another application's API and using it in the context of their own. Third-party APIs allow developers to access their data and functionality by making requests with specific parameters to a URL. In this homework assignment, your challenge is to build a weather dashboard using the OpenWeather API.
