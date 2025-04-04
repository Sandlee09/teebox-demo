/**
 * Formats a timestamp into a readable date
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {string} Formatted date string
 */
export const getDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

/**
 * Formats a timestamp into a readable time
 * @param {number} timestamp - Unix timestamp in seconds
 * @returns {string} Formatted time string
 */
export const getTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Returns the URL for a weather icon
 * @param {string} iconCode - OpenWeatherMap icon code
 * @returns {string} Icon URL
 */
export const getWeatherIcon = (iconCode) => {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};
