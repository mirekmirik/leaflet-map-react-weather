import {
  FetchWeatherLink,
  GetFetchHourlyWeather,
  GetFetchWeather,
  WeatherOfPlace,
  WeatherOfPlaceHourly,
} from "./types";

const fetchWeatherLink: FetchWeatherLink = (lat: number, lng: number) => {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=uk&units=metric&appid=${process.env.REACT_APP_API_WEATHER}`;
};

const fetchHourlyWeatherLink = (lat: number, lng: number) => {
  return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${process.env.REACT_APP_API_WEATHER}`;
};

export const getFetchWeather: GetFetchWeather = async (
  receivedLat: number,
  receivedLng: number
): Promise<WeatherOfPlace> => {
  try {
    const response = await fetch(fetchWeatherLink(receivedLat, receivedLng));
    if (!response.ok) {
      const data = await response.json();
      const error = data.errors[0];
      throw new Error(error.message);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};

export const getFetchHourlyWeather: GetFetchHourlyWeather = async (
  receivedLat,
  receivedLng
): Promise<WeatherOfPlaceHourly> => {
  try {
    const response = await fetch(
      fetchHourlyWeatherLink(receivedLat, receivedLng)
    );
    if (!response.ok) {
      const data = await response.json();
      const error = data.errors[0];
      throw new Error(error.message);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
};
