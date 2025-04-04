/**
 * Converts temperature from Kelvin to Celsius or Fahrenheit
 * @param {number} kelvin - Temperature in Kelvin
 * @param {boolean} useCelsius - Whether to convert to Celsius (true) or Fahrenheit (false)
 * @returns {number} Converted temperature rounded to the nearest integer
 */
export const convertTemp = (kelvin, useCelsius) => {
  if (useCelsius) {
    return Math.round(kelvin - 273.15);
  } else {
    return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
  }
};
