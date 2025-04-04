import React from "react";
import { convertTemp } from "../utils/temperatureUtils.js";
import { getTime } from "../utils/dateUtils.js";

const DetailsView = ({ weatherData, useCelsius, setView }) => {
  if (!weatherData) return null;

  return (
    <div className="py-2">
      <h3 className="text-center text-lg font-medium mb-4">Weather Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white bg-opacity-10 rounded-lg p-3">
          <h4 className="text-sm font-medium border-b border-white border-opacity-20 pb-1 mb-2">
            Temperature
          </h4>
          <p className="text-sm my-1">
            Current: {convertTemp(weatherData.main.temp, useCelsius)}°
            {useCelsius ? "C" : "F"}
          </p>
          <p className="text-sm my-1">
            Feels like: {convertTemp(weatherData.main.feels_like, useCelsius)}°
            {useCelsius ? "C" : "F"}
          </p>
          <p className="text-sm my-1">
            Min: {convertTemp(weatherData.main.temp_min, useCelsius)}°
            {useCelsius ? "C" : "F"}
          </p>
          <p className="text-sm my-1">
            Max: {convertTemp(weatherData.main.temp_max, useCelsius)}°
            {useCelsius ? "C" : "F"}
          </p>
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg p-3">
          <h4 className="text-sm font-medium border-b border-white border-opacity-20 pb-1 mb-2">
            Wind
          </h4>
          <p className="text-sm my-1">
            Speed: {Math.round(weatherData.wind.speed * 3.6)} km/h
          </p>
          <p className="text-sm my-1">Direction: {weatherData.wind.deg}°</p>
          {weatherData.wind.gust && (
            <p className="text-sm my-1">
              Gust: {Math.round(weatherData.wind.gust * 3.6)} km/h
            </p>
          )}
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg p-3">
          <h4 className="text-sm font-medium border-b border-white border-opacity-20 pb-1 mb-2">
            Atmosphere
          </h4>
          <p className="text-sm my-1">
            Pressure: {weatherData.main.pressure} hPa
          </p>
          <p className="text-sm my-1">Humidity: {weatherData.main.humidity}%</p>
          <p className="text-sm my-1">
            Visibility: {weatherData.visibility / 1000} km
          </p>
        </div>

        <div className="bg-white bg-opacity-10 rounded-lg p-3">
          <h4 className="text-sm font-medium border-b border-white border-opacity-20 pb-1 mb-2">
            Sun
          </h4>
          <p className="text-sm my-1">
            Sunrise: {getTime(weatherData.sys.sunrise)}
          </p>
          <p className="text-sm my-1">
            Sunset: {getTime(weatherData.sys.sunset)}
          </p>
        </div>
      </div>

      <button
        className="mt-4 w-full py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
        onClick={() => setView("daily")}
      >
        Back to Daily View
      </button>
    </div>
  );
};

export default DetailsView;
