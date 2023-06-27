import { useEffect, useState } from "react";
import axios from "axios";
import Clock from "./Clock";
import DayForecast from "./DayForecast";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const ThirtyDayForecast = (props) => {
  const [forecastData, setForecastData] = useState([]);
  const [isDaytime2, setIsDaytime2] = useState();
  const [isMetricUnits, setIsMetricUnits] = useState();

  // Get current date information
  const currentDate2 = new Date();
  const currentHour2 = currentDate2.getHours();

  const cityName = props.cityName;
  const url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=aa9a4fce7da1e9f72c094d713ddc26e9`;

  useEffect(() => {
    // Fetch weather forecast data
    axios
      .get(url2)
      .then((response) => {
        const formattedData = response.data.list.map((item) => {
          const dateTime = new Date(item.dt_txt);
          const formattedDate = dateTime.toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
          });
          const formattedHours = dateTime.getHours() % 12 || 12;
          const formattedMinutes = dateTime.getMinutes();
          const timeOfDay = dateTime.getHours() >= 12 ? "PM" : "AM";
          const formattedTime = `${formattedHours}:${
            formattedMinutes < 10 ? "0" + formattedMinutes : formattedMinutes
          } ${timeOfDay}`;

          const weatherDescription = item.weather[0].description;
          const temp = Math.round(item.main.temp - 273.15) + "°C";
          const impTemp =
            Math.round((item.main.temp - 273.15) * (9 / 5) + 32) + "°F";
          const chanceOfPrecipitation = Math.round(item.pop * 100) + "%";
          const cloudCoverage = item.clouds.all + "%";

          const currentDate = new Date();
          const isToday =
            dateTime.getDate() === currentDate.getDate() &&
            dateTime.getMonth() === currentDate.getMonth() &&
            dateTime.getFullYear() === currentDate.getFullYear();

          // Determine if it's daytime based on local time (between 8am and 8pm)
          setIsDaytime2(currentHour2 >= 8 && currentHour2 <= 20);
          setIsMetricUnits(props.isMetricUnits);

          return {
            formattedDate: isToday ? "Today" : formattedDate,
            formattedTime,
            weatherDescription,
            temp: isMetricUnits ? temp : impTemp,
            chanceOfPrecipitation,
            cloudCoverage,
          };
        });
        setForecastData(formattedData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [url2, isMetricUnits]);

  const handleButtonClick = () => {
    // Handle button click to go back to the main forecast page
    props.setIsContentVisible(true);
    props.toggleShowSearch(false);
  };

  return (
    <>
      <div
        className={`forecastContainer ${
          isDaytime2 ? "daytime2" : "nighttime2"
        }`}
      >
        <header>
          {/* Button to go back to the main forecast page */}
          <button
            className="transparent-button backArrow"
            onClick={handleButtonClick}
          >
            <MdOutlineArrowBackIosNew />
          </button>
          {/* Display current time */}
          <Clock className="currentTime2" />
        </header>
        <center>
          <div className="cityNameDailyPage">
            {/* Display the city name */}
            {cityName.charAt(0).toUpperCase() + cityName.slice(1)}
          </div>
          <div className="allBoxesContainer">
            {/* Render daily forecast data */}
            {forecastData.map((data, index) => (
              <DayForecast
                key={index}
                formattedDate={data.formattedDate}
                formattedTime={data.formattedTime}
                weatherDescription={
                  data.weatherDescription.charAt(0).toUpperCase() +
                  data.weatherDescription.slice(1)
                }
                temp={data.temp}
                chanceOfPrecipitation={data.chanceOfPrecipitation}
                cloudCoverage={data.cloudCoverage}
              />
            ))}
          </div>
        </center>
      </div>
    </>
  );
};

export default ThirtyDayForecast;
