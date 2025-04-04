import React from "react";
import { convertTemp } from "../utils/temperatureUtils.js";
import { getDate, getTime, getWeatherIcon } from "../utils/dateUtils.js";

const HourlyForecast = ({ hourlyForecast, useCelsius, setView }) => {
  if (!hourlyForecast.length) {
    return (
      <div className="text-center py-4">
        <p>No hourly data available</p>
        <button
          className="mt-4 w-full py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-colors"
          onClick={() => setView("daily")}
        >
          Back to Daily View
        </button>
      </div>
    );
  }

  return (
    <div className="py-2">
      <h3 className="text-center text-lg font-medium my-2">
        {getDate(hourlyForecast[0].dt)}
      </h3>
      <div className="overflow-x-auto flex gap-4 py-2">
        {hourlyForecast.map((hour) => (
          <div key={hour.dt} className="min-w-14 text-center">
            <p className="text-sm mb-1">{getTime(hour.dt)}</p>
            <img
              src={getWeatherIcon(hour.weather[0].icon)}
              alt={hour.weather[0].description}
              className="w-10 h-10 mx-auto"
            />
            <p className="text-sm mt-1">
              {convertTemp(hour.main.temp, useCelsius)}°
            </p>
          </div>
        ))}
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

export default HourlyForecast;
