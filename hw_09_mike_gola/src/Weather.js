import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "bac35bb5601ed46a0e888757a7dba709";  // Replace with your WeatherStack API key

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
      );
      setWeatherData(response.data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError("City not found or invalid API key");
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.location.name}, {weatherData.location.country}</h2>
          <p>Temperature: {weatherData.current.temperature}°C</p>
          <p>Weather: {weatherData.current.weather_descriptions[0]}</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind Speed: {weatherData.current.wind_speed} km/h</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
