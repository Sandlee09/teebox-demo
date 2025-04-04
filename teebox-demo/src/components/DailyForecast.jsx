import React from "react";
import { convertTemp } from "../utils/temperatureUtils.js";
import { getDate, getWeatherIcon } from "../utils/dateUtils.js";

const DailyForecast = ({
  dailyForecast,
  useCelsius,
  selectedDay,
  setSelectedDay,
  setView,
}) => {
  return (
    <div className="overflow-x-auto py-4 flex gap-2 pb-2">
      {dailyForecast.map((day, index) => (
        <div
          key={day.dt}
          className={`min-w-20 p-2 rounded-lg text-center cursor-pointer transition-colors ${
            selectedDay === index
              ? "bg-white bg-opacity-20"
              : "bg-white bg-opacity-10 hover:bg-opacity-15"
          }`}
          onClick={() => {
            setSelectedDay(index);
            setView("hourly");
          }}
        >
          <p className="text-xs m-0 mb-1">{getDate(day.dt)}</p>
          <img
            src={getWeatherIcon(day.weather.icon)}
            alt={day.weather.description}
            className="w-12 h-12 mx-auto"
          />
          <div className="flex justify-center gap-2 text-sm">
            <span>{convertTemp(day.temp.max, useCelsius)}°</span>
            <span className="opacity-70">
              {convertTemp(day.temp.min, useCelsius)}°
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyForecast;
