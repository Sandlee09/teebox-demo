import React from "react";

const TemperatureToggle = ({ useCelsius, setUseCelsius }) => {
  return (
    <div className="flex border border-white border-opacity-30 rounded-full overflow-hidden">
      <button
        className={`px-2 py-1 text-sm transition-colors ${
          useCelsius ? "bg-white bg-opacity-20" : ""
        }`}
        onClick={() => setUseCelsius(true)}
      >
        °C
      </button>
      <button
        className={`px-2 py-1 text-sm transition-colors ${
          !useCelsius ? "bg-white bg-opacity-20" : ""
        }`}
        onClick={() => setUseCelsius(false)}
      >
        °F
      </button>
    </div>
  );
};

export default TemperatureToggle;
