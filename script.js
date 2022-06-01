//Digital clock
//creating a function to update the time
function updateTime() {
  //creating variables for time elements using the date method
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let seconds = new Date().getSeconds();
  let timeOfTheDay = "AM";
  let day = new Date().getDay();
  let date = new Date().getDate();
  let month = new Date().getMonth();
  let year = new Date().getFullYear();
  // Specifying what time of the day to use PM
  if (hours >= 12) {
    timeOfTheDay = "PM";
  }
  // Setting two digits to values on date and time elements
  Number.prototype.pad = function (digits) {
    for (var n = this.toString(); n.length < digits; n = 0 + n);
    return n;
  };
  //An array of months of the year
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // An array of days of the year

  let days = ["Sun", "Mon", "Teu", "Wed", "Thur", "Fri", "Sat"];

  // An array of date and time ids

  let ids = [
    "hours",
    "minutes",
    "seconds",
    "time-of-the-day",
    "day",
    "date",
    "month",
    "year",
  ];

  //an array of the values of the date and time ids

  let values = [
    hours.pad(2),
    minutes.pad(2),
    seconds.pad(2),
    timeOfTheDay,
    days[day],
    date.pad(2),
    months[month],
    year,
  ];

  // A loop that links each id and its value to display it on the dom
  for (let i = 0; i < ids.length; i++)
    document.getElementById(ids[i]).firstChild.nodeValue = values[i];

  //displaying time on html

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
