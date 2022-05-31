//Digital clock

// Getting time elements from html to save them in new variables

const hourElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const timeOfTheDayElement = document.getElementById("time-of-the-day");

//creating a function to update the time
function updateTime() {
  //creating variables for time elements using the date method
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let seconds = new Date().getSeconds();
  let timeOfTheDay = "AM";

  if (hours >= 12) {
    timeOfTheDay = "PM";
  }
  /*modifying the time elements so that they
show two digits per element
*/
  hours < 10 ? "0" + hours : hours;
  minutes < 10 ? "0" + minutes : minutes;
  seconds < 10 ? "0" + seconds : seconds;
  //displaying time on html

  hourElement.innerText = hours;
  minutesElement.innerText = minutes;
  secondsElement.innerText = seconds;
  timeOfTheDayElement.innerText = timeOfTheDay;

  setTimeout(() => {
    updateTime();
  }, 1000);
}
updateTime();
// Creating an object containing weather informations

let weatherInfo = {
  apiKey: "278538458ac3f1865c1b3230f866fcaf",
  // Getting weather infomation from open Weather
  getWeatherInfo: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeatherInfo(data));
  },
  // Displaying the weather
  displayWeatherInfo: function (data) {
    //creating variables for each weather element
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { country } = data.sys;
    document.querySelector(".city").innerText = name + " , " + country;
    document.querySelector(".temp").innerText = Math.round(temp) + " °C";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind-speed").innerText =
      "Wind Speed: " + speed + "km/h";
  },
  searchWeather: function () {
    this.getWeatherInfo(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search-button").addEventListener("click", function () {
  weatherInfo.searchWeather();
});
document.querySelector(".search-bar").addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    weatherInfo.searchWeather();
  }
});
weatherInfo.getWeatherInfo("nykarleby");
