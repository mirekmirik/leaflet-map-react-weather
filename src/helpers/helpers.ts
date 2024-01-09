// const API_WEATHER = "690b4fa678cee76b84579c3cd01978b8";

type GetCurrentWeatherApiProps = (lat: number, lng: number) => string;

export const getCurrentWeatherApi: GetCurrentWeatherApiProps = (
  lat: number,
  lng: number
) => {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&lang=uk&units=metric&appid=${process.env.REACT_APP_API_WEATHER}`;
};


export const toFixedTemp = (temp: number) => {
  const fixedTemp = Number(temp.toFixed(0));
  return fixedTemp > 0 ? `+${fixedTemp}` : fixedTemp;
};