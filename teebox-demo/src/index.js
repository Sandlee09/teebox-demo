import React from "react";
import { createRoot } from "react-dom/client";
import WeatherWidget from "./components/WeatherWidget.jsx";

// Create a global Widget object
window.Widget = {
  init: function (config) {
    const { city } = config;

    // Find the container or create one if it doesn't exist
    let container = document.getElementById("widget-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "widget-container";
      document.body.appendChild(container);
    }

    // Render the widget
    const root = createRoot(container);
    root.render(<WeatherWidget city={city} />);
  },
};

// Handle direct initialization when script is loaded directly
document.addEventListener("DOMContentLoaded", function () {
  // Only auto-initialize if specifically set up this way
  if (window.autoInitWeatherWidget && window.autoInitWeatherWidget.city) {
    window.Widget.init({
      city: window.autoInitWeatherWidget.city,
    });
  }
});
