import React from "react";
import { useMap } from "react-leaflet";
import { WeatherOfPlace } from "src/api/weather/types";
import {
  getFetchHourlyWeather,
  getFetchWeather,
} from "src/api/weather/weather";
import { setShowDrawer, setWeathers } from "src/store/drawer/drawerSlice";
import { useAppDispatch } from "src/store/hooks";
import { setShowInput } from "src/store/searchInput/searchInputSlice";

interface CityProps {
  id: number;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  onAddNewPlace: (place: WeatherOfPlace) => void;
}

const City: React.FC<CityProps> = ({
  id,
  city,
  country,
  latitude,
  longitude,
  onAddNewPlace,
}) => {
  const map = useMap();
  const dispatch = useAppDispatch();

  const onMoveToCityLocation = async () => {
    map.flyTo([latitude, longitude]);
    const weather = await getFetchWeather(latitude, longitude);
    const weathers = await getFetchHourlyWeather(latitude, longitude);
    onAddNewPlace(weather);
    dispatch(setWeathers(weathers));
    dispatch(setShowDrawer(true));
    dispatch(setShowInput(false));
  };

  return (
    <>
      <div
        key={id}
        className="hover:dark:text-gray-100 hover:text-gray-400 transition cursor-pointer"
        onClick={onMoveToCityLocation}
      >
        {city}, {country}
      </div>
    </>
  );
};

export default City;
