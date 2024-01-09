export type LocationsOfCitiesProps = {
  name: string;
  lat: number;
  lng: number;
}[];

export type WeatherOfCity = {
  name: string;
  temp: number;
  weather: {
    name: string;
    icon: string;
  };
  coord: {
    lat: number;
    lng: number;
  };
};

export type WeatherOfCities = WeatherOfCity[]

