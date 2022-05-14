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
    console.log(name, icon, description, temp, humidity, speed, country);
    document.querySelector(".city").innerText = name + " , " + country;
    document.querySelector(".temp").innerText = temp + " °C";
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind-speed").innerText =
      "Wind Speed: " + speed + "%";
  },
};
