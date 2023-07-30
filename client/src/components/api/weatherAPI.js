import axios from "axios";

export const fetchWeatherData = async (lat, lon) => {
  console.log(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${"4cd0b10f36aac5119667403efc13f4b9"}&units=metric`,
  );
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${"4cd0b10f36aac5119667403efc13f4b9"}&units=metric`,
    );
    console.log(response.data);
    console.log("Temperature: ", response.data.main.temp);
    return response.data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
};
