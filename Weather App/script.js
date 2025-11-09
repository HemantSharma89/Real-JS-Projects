const key = "9c2ffe3f08ca138d8d39d7afb5825352";
const keyUpi =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".sr-bar input");
const searchBtn = document.querySelector(".sr-bar button");
const weatherIcon = document.querySelector(".weather-icon");
async function checkWeather(city) {
  try {
    let response = await fetch(keyUpi + city + `&appid=${key}`);
    if (!response.ok) {
      throw new Error("City not found or API error");
    }
    let data = await response.json();
    // console.log(data);
    // Update DOM with fetched data
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    // Update weather icon based on condition
    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    }
  } catch (error) {
    alert("Error: " + error.message + ". Please check the city name.");
  }
}
// Event listener for search button
searchBtn.addEventListener("click", () => {
  if (searchBox.value.trim() !== "") {
    checkWeather(searchBox.value);
  } else {
    alert("Please enter a city name.");
  }
});
// Load default city on page load
checkWeather(data);
