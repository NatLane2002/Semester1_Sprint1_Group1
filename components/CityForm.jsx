import React, { useState } from "react";

function CityForm({ onSubmit }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(city);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter location"
      />
      <button className="transparent-button" type="submit"></button>
    </form>
  );
}

export default CityForm;
