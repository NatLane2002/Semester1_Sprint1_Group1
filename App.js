import React, { useState, useEffect } from "react";
import axios from "axios";
import CityForm from "./components/CityForm";
import DailyForecastButton from "./components/DailyForecastButton";
import ThirtyDayForecast from "./components/ThirtyDayForecast";
import Clock from "./components/Clock";
import { TbSearch } from "react-icons/tb";

function App() {
  // State variables
  const [cityName, setCityName] = useState("ontario");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [temperature, setTemperature] = useState("");
  const [feelsLike, setFeelsLike] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [sunsetTime, setSunsetTime] = useState("");
  const [showSearch, toggleShowSearch] = useState(false);
  const [validCityName, setValidCityName] = useState(cityName);
  const [isDaytime, setIsDaytime] = useState();
  const [isContentVisible, setIsContentVisible] = useState(true);
  const [isMetricUnits, setIsMetricUnits] = useState(true);

  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=aa9a4fce7da1e9f72c094d713ddc26e9`;

  // Load weather data on initial render and whenever cityName or url changes
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const data = response.data;
        const curDescription = data.weather[0].description;
        const curTemp = Math.round(data.main.temp - 273.15) + "°C";
        const curFeelsLike = Math.round(data.main.feels_like - 273.15) + "°C";
        const curHumidity = data.main.humidity + "%";
        const curWind = (data.wind.speed * 1.852).toFixed(2) + " km/h";
        const curSunsetTimestamp = data.sys.sunset * 1000;
        const curSunset = new Date(curSunsetTimestamp);
        const curImpWind = (data.wind.speed * 1.15078).toFixed(2) + " mph";
        const curImpTemp =
          Math.round((data.main.temp - 273.15) * (9 / 5) + 32) + "°F";
        const curImpFeelsLike =
          Math.round((data.main.feels_like - 273.15) * (9 / 5) + 32) + "°F";

        // Update state with weather data
        setWeatherDescription(curDescription);
        setTemperature(isMetricUnits ? curTemp : curImpTemp);
        setFeelsLike(isMetricUnits ? curFeelsLike : curImpFeelsLike);
        setHumidity(curHumidity);
        setWind(isMetricUnits ? curWind : curImpWind);
        setValidCityName(cityName);
        setSunsetTime(curSunset);

        // Determine if it's daytime based on local time (between 8am and 8pm)
        setIsDaytime(currentHour >= 8 && currentHour <= 20);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [cityName, url, isMetricUnits]);

  // Function to handle setting the city name when the form is submitted
  const handleFormSubmit = (city) => {
    setCityName(city);
  };

  // Function to handle hiding the first page
  const handleHideContent = () => {
    setIsContentVisible(false);
  };

  // Function to handle showing the first page
  const handleShowContent = () => {
    setIsContentVisible(true);
    toggleShowSearch(false);
  };

  // Function to handle changing the units on the page back and forth between metric and imperial
  const handleChangeUnits = () => {
    setIsMetricUnits(!isMetricUnits);
  };

  // All jsx returned inside of the App.js component
  return (
    <>
      <div id="contentContainer">
        {isContentVisible ? (
          <div className={`app ${isDaytime ? "daytime" : "nighttime"}`}>
            <header className="header">
              <button
                className="transparent-button"
                onClick={() => {
                  toggleShowSearch(!showSearch);
                }}
              >
                <TbSearch />
              </button>
              <DailyForecastButton
                className="changeUnitsButton"
                onClick={handleChangeUnits}
                text={`${isMetricUnits ? "Imperial" : "Metric"}`}
              />
              <Clock className="currentTime" />
              {showSearch && <CityForm onSubmit={handleFormSubmit} />}
            </header>
            <main className="weatherInformation">
              <div className="top"></div>
              <div className="bottom"></div>
              {validCityName && (
                <div className="location">
                  <h1>
                    {validCityName.charAt(0).toUpperCase() +
                      validCityName.slice(1)}
                  </h1>
                </div>
              )}
              <div className="temp">
                <h1>{`${temperature}`}</h1>
              </div>
              <div className="description">
                <h1>{`${
                  weatherDescription.charAt(0).toUpperCase() +
                  weatherDescription.slice(1)
                }`}</h1>
              </div>
              <center>
                <footer className="bottomBox">
                  <table className="bottomTable">
                    <thead className="thead">
                      <tr>
                        <th className="feels">{`${feelsLike}`}</th>
                        <th className="humidity">{`${humidity}`}</th>
                        <th className="wind">{wind}</th>
                      </tr>
                    </thead>
                    <tbody className="tbody">
                      <tr>
                        <td>Feels Like</td>
                        <td>Humidity</td>
                        <td>Winds</td>
                      </tr>
                    </tbody>
                  </table>
                </footer>
                <DailyForecastButton
                  className="forecastButton"
                  onClick={handleHideContent}
                  text="Detailed Forecast"
                />
              </center>
            </main>
          </div>
        ) : (
          <ThirtyDayForecast
            cityName={cityName}
            setIsContentVisible={setIsContentVisible}
            toggleShowSearch={toggleShowSearch}
            isMetricUnits={isMetricUnits}
          />
        )}
      </div>
    </>
  );
}

export default App;
