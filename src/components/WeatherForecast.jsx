import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherForecast = ({ location }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const API_KEY = 'd98d00789c5bc706aa741de48615f062'; // Replace with your actual API key
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`;

      try {
        setLoading(true);
        const response = await axios.get(url);
        // We'll take the forecast for the next 3 days
        const forecast = response.data.list.slice(0, 8); // 8 * 3 hours = 24 hours
        setWeather(forecast);
        setError(null);
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error('Error fetching weather data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (location) {
      fetchWeather();
    }
  }, [location]);

  if (loading) return <div>Loading weather data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!weather) return null;

  return (
    <div className="bg-card text-card-foreground p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Weather Forecast</h3>
      <div className="grid grid-cols-4 gap-2">
        {weather.map((item, index) => (
          <div key={index} className="text-center">
            <p className="font-medium">{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <img 
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} 
              alt={item.weather[0].description}
              className="mx-auto"
            />
            <p>{Math.round(item.main.temp)}°C</p>
            <p className="text-sm text-muted-foreground">{item.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
