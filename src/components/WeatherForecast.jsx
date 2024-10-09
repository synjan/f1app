import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherForecast = ({ location, raceDate, raceTime }) => {
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
        const raceDateTime = new Date(`${raceDate}T${raceTime}`);
        const raceHour = raceDateTime.getHours();

        // Find the forecast closest to the race time
        const closestForecast = response.data.list.reduce((closest, current) => {
          const currentDate = new Date(current.dt * 1000);
          const currentHourDiff = Math.abs(currentDate.getHours() - raceHour);
          const closestHourDiff = Math.abs(new Date(closest.dt * 1000).getHours() - raceHour);
          
          return currentHourDiff < closestHourDiff ? current : closest;
        });

        setWeather(closestForecast);
        setError(null);
      } catch (err) {
        setError('Failed to fetch weather data');
        console.error('Error fetching weather data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (location && raceDate && raceTime) {
      fetchWeather();
    }
  }, [location, raceDate, raceTime]);

  if (loading) return <div>Loading weather data...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!weather) return null;

  return (
    <div className="bg-card text-card-foreground p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2">Race Time Weather Forecast</h3>
      <div className="flex items-center justify-center space-x-4">
        <img 
          src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
          alt={weather.weather[0].description}
          className="w-16 h-16"
        />
        <div>
          <p className="text-2xl font-bold">{Math.round(weather.main.temp)}°C</p>
          <p className="text-lg capitalize">{weather.weather[0].description}</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <p>Humidity: {weather.main.humidity}%</p>
        <p>Wind: {Math.round(weather.wind.speed * 3.6)} km/h</p>
        <p>Feels like: {Math.round(weather.main.feels_like)}°C</p>
        <p>Chance of rain: {Math.round(weather.pop * 100)}%</p>
      </div>
    </div>
  );
};

export default WeatherForecast;
