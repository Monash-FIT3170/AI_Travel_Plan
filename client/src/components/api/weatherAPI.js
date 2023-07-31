import axios from "axios";

export const fetchWeatherForLocation = async (location) => {
    try {
        // fetch lat and lon for the location
        const latLonResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
        
        // check if the array is not empty
        if (!latLonResponse.data || latLonResponse.data.length === 0) {
            console.error("No lat/lon data available for this location");
            return null;
        }
        
        const lat = latLonResponse.data[0].lat;
        const lon = latLonResponse.data[0].lon;

        // fetch weather for the lat and lon
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,
        );
        return weatherResponse.data;
    } catch (error) {
        console.error("Error fetching data: ", error);
        return null;
    }
};

export function getLocationDetails(locationString) {
    // Split the location string by comma
    const parts = locationString.split(',');

    if (parts.length === 2) {
        // Split by space or dash and return the first word
        const subParts = parts[0].trim().split(/[\s-]+/);
        return subParts[0];
    } else {
        // Split by space or dash and return the first word
        const subParts = parts[1].trim().split(/[\s-]+/);
        return subParts[0];
    }
}


// export const fetchWeatherData = async (lat, lon) => {
//   try {
//     const response = await axios.get(
//       `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`,
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching data: ", error);
//     return null;
//   }
// };

// export const fetchLatLon = async (location) => {
//     try {
//         const response = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${process.env.REACT_APP_WEATHER_API_KEY}`);
//         console.log(response.data)
//         console.log(response.data[0].lat)
//         console.log(response.data[0].lon)
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching data: ", error);
//         return null;
//     }
// }