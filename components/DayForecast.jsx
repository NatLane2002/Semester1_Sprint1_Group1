import React, { useState } from "react";
import { BsCloudRain } from "react-icons/bs";
import { AiOutlineCloud } from "react-icons/ai";

const DayForecast = ({
  formattedDate,
  formattedTime,
  weatherDescription,
  temp,
  chanceOfPrecipitation,
  cloudCoverage,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  // Function to handle the mouse entering the component. setShowPopup varible to true
  const handleMouseEnter = () => {
    setShowPopup(true);
  };

  // Function to handle the mouse leaving the component. setShowPopup varible to false
  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  // Function which serves to return a different message for each different type of weather present during the 3 hour time period
  const getWeatherAdvice = () => {
    if (weatherDescription.toLowerCase().includes("heavy rain")) {
      return "It's going to rain heavily. Stay indoors if possible.";
    } else if (weatherDescription.toLowerCase().includes("moderate rain")) {
      return "Expect moderate rain. Don't forget your umbrella.";
    } else if (weatherDescription.toLowerCase().includes("light rain")) {
      return "There might be light rain. Dress to get wet.";
    } else if (weatherDescription.toLowerCase().includes("rain")) {
      return "You should wear your raincoat.";
    } else if (weatherDescription.toLowerCase().includes("scattered clouds")) {
      return "Expect a mix of sun and clouds.";
    } else if (weatherDescription.toLowerCase().includes("broken clouds")) {
      return "Partly cloudy with scattered clouds.";
    } else if (weatherDescription.toLowerCase().includes("overcast clouds")) {
      return "It's overcast. Take an umbrella just in case.";
    } else if (weatherDescription.toLowerCase().includes("few clouds")) {
      return "Partly cloudy with a few clouds.";
    } else if (
      weatherDescription.toLowerCase().includes("clear sky") &&
      parseInt(temp) >= 20
    ) {
      return "Don't forget your sunscreen!";
    } else if (weatherDescription.toLowerCase().includes("cold")) {
      return "Bundle up and keep warm!";
    } else if (weatherDescription.toLowerCase().includes("windy")) {
      return "Secure any loose items due to strong winds.";
    } else {
      return "Enjoy the weather!";
    }
  };

  // All data contained within the DayForecast component
  return (
    <>
      <div
        className="dailyBox"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <p className="date">{formattedDate}</p>
        <p className="time">{formattedTime}</p>
        <hr />
        <p className="weatherDescription2">{weatherDescription}</p>
        <p className="temp2">{temp}</p>
        <hr />
        <div className="bottomPortionPage2">
          <p>
            <div className="cloudIcon">
              <AiOutlineCloud />
            </div>
            <div className="cloudCoverage">{cloudCoverage}</div>
          </p>
          <p>
            <div className="rainCloudIcon">
              <BsCloudRain />
            </div>
            <div className="chanceOfPrecipitation">{chanceOfPrecipitation}</div>
          </p>
        </div>
      </div>

      {/* This code shows the popup when the showPopup variable == true! And visa versa */}
      {showPopup && (
        <div className="popup">
          <p>{getWeatherAdvice()}</p>
        </div>
      )}
    </>
  );
};

export default DayForecast;
