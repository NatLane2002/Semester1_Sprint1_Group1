import React, { useState, useEffect } from "react";

const Clock = ({className}) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    function getCurrentTime() {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      const formattedTime =
        padZero(hours) + ":" + padZero(minutes) + ":" + padZero(seconds);

      setCurrentTime(formattedTime);
    }

    function padZero(num) {
      return num < 10 ? "0" + num : num;
    }

    getCurrentTime();

    const timer = setInterval(getCurrentTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return <p className={className}>{currentTime}</p>;
};

export default Clock;
