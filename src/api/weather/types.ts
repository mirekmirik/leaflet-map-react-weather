export type LocationsOfCitiesProps = {
  name: string;
  lat: number;
  lng: number;
}[];

export type WeatherOfPlace = {
  coord: {
    lon: number;
    lat: number;
  };
  name: string;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: "stations";
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  cod: number;
};

export type TransformResponseToWeatherData = (
  data: WeatherOfPlace,
  name: string
) => WeatherOfPlace;

export type FetchWeatherLink = (lat: number, lng: number) => string;

export type GetFetchWeather = (
  receivedLat: number,
  receivedLng: number
) => Promise<WeatherOfPlace>;

export type WeatherOfPlaces = WeatherOfPlace[];
