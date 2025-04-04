import React, { useState, useEffect } from "react";
import { fetchWeatherData } from "../utils/api.js";
import ViewToggle from "./ViewToggle.jsx";
import TemperatureToggle from "./TemperatureToggle.jsx";
import CurrentWeather from "./CurrentWeather.jsx";
import DailyForecast from "./DailyForecast.jsx";
import HourlyForecast from "./HourlyForecast.jsx";
import DetailsView from "./DetailsView.jsx";

const WeatherWidget = ({
  city,
  apiKey = "a8a068a4a6e8fba359710ca234756c68",
}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useCelsius, setUseCelsius] = useState(true);
  const [selectedDay, setSelectedDay] = useState(0);
  const [view, setView] = useState("daily"); // 'daily', 'hourly', 'details'

  useEffect(() => {
    const loadWeatherData = async () => {
      try {
        setLoading(true);
        const { weather, forecast } = await fetchWeatherData(city, apiKey);
        setWeatherData(weather);
        setForecastData(forecast);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (city) {
      loadWeatherData();
    }
  }, [city, apiKey]);

  // Group forecast data by day
  const getDailyForecast = () => {
    if (!forecastData) return [];

    const dailyMap = {};

    forecastData.list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();

      if (!dailyMap[date]) {
        dailyMap[date] = {
          dt: item.dt,
          temp: { min: item.main.temp, max: item.main.temp },
          weather: item.weather[0],
          date: date,
        };
      } else {
        dailyMap[date].temp.min = Math.min(
          dailyMap[date].temp.min,
          item.main.temp
        );
        dailyMap[date].temp.max = Math.max(
          dailyMap[date].temp.max,
          item.main.temp
        );
      }
    });

    return Object.values(dailyMap).slice(0, 5); // Return 5 days
  };

  // Get hourly forecast for selected day
  const getHourlyForecast = () => {
    if (!forecastData) return [];

    const selectedDate = new Date();
    selectedDate.setDate(selectedDate.getDate() + selectedDay);

    const targetYear = selectedDate.getFullYear();
    const targetMonth = selectedDate.getMonth();
    const targetDay = selectedDate.getDate();

    console.log("forecastData", forecastData);

    return forecastData.list.filter((item) => {
      const itemDate = new Date(item.dt * 1000); // Convert from Unix timestamp
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth();
      const itemDay = itemDate.getDate();

      // Compare year, month, and date
      return (
        itemYear === targetYear &&
        itemMonth === targetMonth &&
        itemDay === targetDay
      );
    });
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto bg-gradient-to-b from-blue-800 to-blue-500 text-white p-5 rounded-lg shadow-lg flex flex-col items-center justify-center min-h-64">
        <div className="w-10 h-10 border-4 border-blue-300 border-t-white rounded-full animate-spin mb-4"></div>
        <p>Loading weather data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-gradient-to-b from-blue-800 to-blue-500 text-white p-5 rounded-lg shadow-lg min-h-48 flex flex-col items-center justify-center">
        <h3 className="text-xl font-bold mb-2">Error</h3>
        <p className="text-red-300">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gradient-to-b from-blue-800 to-blue-500 text-white p-5 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{city}</h2>
        <TemperatureToggle
          useCelsius={useCelsius}
          setUseCelsius={setUseCelsius}
        />
      </div>

      <ViewToggle view={view} setView={setView} />

      {view === "daily" && (
        <>
          <CurrentWeather weatherData={weatherData} useCelsius={useCelsius} />
          <DailyForecast
            dailyForecast={getDailyForecast()}
            useCelsius={useCelsius}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            setView={setView}
          />
        </>
      )}

      {view === "hourly" && (
        <HourlyForecast
          hourlyForecast={getHourlyForecast()}
          useCelsius={useCelsius}
          setView={setView}
        />
      )}

      {view === "details" && (
        <DetailsView
          weatherData={weatherData}
          useCelsius={useCelsius}
          setView={setView}
        />
      )}

      <div className="text-center mt-4 text-xs opacity-70">
        <p>Data from OpenWeatherMap</p>
      </div>
    </div>
  );
};

export default WeatherWidget;
