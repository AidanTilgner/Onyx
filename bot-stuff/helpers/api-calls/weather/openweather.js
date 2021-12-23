import Axios from "axios";

export const getWeather = async (lat, lon) => {
  const response = await Axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=metric`
  );
  return response.data;
};
