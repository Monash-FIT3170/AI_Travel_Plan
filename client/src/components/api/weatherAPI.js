import axios from "axios";

export const fetchWeatherForLocation = async (location) => {
  try {
    // fetch lat and lon for the location
    const latLonResponse = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
    );

    // check if the array is not empty
    if (!latLonResponse.data || latLonResponse.data.length === 0) {
      console.error("No lat/lon data available for this location");
      return null;
    }

    const lat = latLonResponse.data[0].lat;
    const lon = latLonResponse.data[0].lon;

    // fetch weather for the lat and lon
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    );

    console.log(weatherResponse.data);
    return weatherResponse.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
};

export const getWeatherIconUrl = (iconCode) => {
  if (!iconCode) return null;
  return `http://openweathermap.org/img/w/${iconCode}.png`;
};
