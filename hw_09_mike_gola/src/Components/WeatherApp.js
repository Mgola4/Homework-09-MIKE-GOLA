import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, Box, Typography, Paper } from "@mui/material";
import { WiDaySunny, WiCloudy, WiRain } from "react-icons/wi"; // Weather Icons
import { ClipLoader } from "react-spinners"; // Spinner


const WeatherApp = () => { 
  const [city, setCity] = useState("New York");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Fetch weather data
  useEffect(() => {
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
        setError("");
      })
      .catch((err) => {
        setLoading(false);
        setError("City not found!");
        setWeatherData(null);
      });
  }, [city]);


  // Handle city change
  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSearch = () => {
    setCity(city);
  };

  return (
     <Container sx={{ textAlign: "center", paddingTop: "50px" }}>
        <Paper sx={{ padding: 3, boxShadow: 3 }}>
          <Typography>Weather App</Typography>
          <TextField>
            label="Enter city"
            variant="outlined"
            value={city}
            onChange={handleChange}
            sx={{ width: 300, marginBottom: 2 }}
          </TextField>

          <Button variant="contained" onClick={handleSearch}>Search</Button>

          {loading ? (
          <Box sx={{ marginTop: 4 }}>
            <ClipLoader color="blue" loading={loading} size={50} />
          </Box>
        ) : (
          <>
            {error && <Typography color="error">{error}</Typography>}
            {weatherData && (
              <Box sx={{ marginTop: 4 }}>
                <Typography variant="h5">{weatherData.name}, {weatherData.sys.country}</Typography>
                <Typography variant="h6">{weatherData.weather[0].description}</Typography>

                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 2 }}>
                  {weatherData.weather[0].main === "Clear" && <WiDaySunny size={50} />}
                  {weatherData.weather[0].main === "Clouds" && <WiCloudy size={50} />}
                  {weatherData.weather[0].main === "Rain" && <WiRain size={50} />}
                  <Typography variant="h3" sx={{ marginLeft: 2 }}>
                    {weatherData.main.temp}°C
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ marginTop: 2 }}>
                  Humidity: {weatherData.main.humidity}%
                </Typography>
                <Typography variant="body1">
                  Wind: {weatherData.wind.speed} m/s
                </Typography>
              </Box>
            )}
          </>
        )}
        </Paper>
     </Container>
  );
}