import React from "react";
import { convertTemp } from "../utils/temperatureUtils.js";
import { getWeatherIcon } from "../utils/dateUtils.js";

const CurrentWeather = ({ weatherData, useCelsius }) => {
  if (!weatherData) return null;

  return (
    <div className="flex flex-wrap items-center py-4 border-b border-white border-opacity-20">
      <div className="flex-1">
        <h3 className="text-4xl font-light m-0">
          {convertTemp(weatherData.main.temp, useCelsius)}°
          {useCelsius ? "C" : "F"}
        </h3>
        <p className="mt-1 capitalize">{weatherData.weather[0].description}</p>
      </div>

      <div className="flex-none">
        <img
          src={getWeatherIcon(weatherData.weather[0].icon)}
          alt={weatherData.weather[0].description}
          className="w-20 h-20"
        />
      </div>

      <div className="w-full mt-2 flex justify-between">
        <p className="text-sm">
          Feels like: {convertTemp(weatherData.main.feels_like, useCelsius)}°
          {useCelsius ? "C" : "F"}
        </p>
        <p className="text-sm">Humidity: {weatherData.main.humidity}%</p>
        <p className="text-sm">
          Wind: {Math.round(weatherData.wind.speed * 3.6)} km/h
        </p>
      </div>
    </div>
  );
};

export default CurrentWeather;
