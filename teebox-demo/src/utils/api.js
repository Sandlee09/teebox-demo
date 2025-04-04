/**
 * Fetches weather data for a specific city
 * @param {string} city - The name of the city
 * @param {string} apiKey - OpenWeatherMap API key
 * @returns {Promise<{weather: Object, forecast: Object}>} Weather and forecast data
 */
export const fetchWeatherData = async (city, apiKey) => {
  try {
    // First get coordinates for the city
    const geoResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    );

    if (!geoResponse.ok) {
      throw new Error("Failed to fetch location data");
    }

    const geoData = await geoResponse.json();

    if (!geoData.length) {
      throw new Error("City not found");
    }

    const { lat, lon } = geoData[0];

    // Get current weather
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }

    // Get forecast data
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );

    if (!forecastResponse.ok) {
      throw new Error("Failed to fetch forecast data");
    }

    const weather = await weatherResponse.json();
    const forecast = await forecastResponse.json();

    return { weather, forecast };
  } catch (error) {
    throw error;
  }
};
