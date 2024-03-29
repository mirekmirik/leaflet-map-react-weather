import React from "react";
import { ScrollArea } from "../ui/scroll-area/scroll-area";
import { Separator } from "../ui/separator/separator";
import City from "./City";
import { CitiesFetch } from "src/api/searchCities/types";
import { WeatherOfPlace } from "src/api/weather/types";

interface CitiesListProps {
  cities: CitiesFetch[];
  onAddNewPlace: (place: WeatherOfPlace) => void;
}

const CitiesList: React.FC<CitiesListProps> = ({ cities, onAddNewPlace }) => {
  return cities.length ? (
    <ScrollArea className="h-72 w-full rounded-md border py-2 px-2">
      {cities.map((city) => {
        return (
          <>
            <City
              key={city.id}
              city={city.city}
              country={city.country}
              id={city.id}
              longitude={city.longitude}
              latitude={city.latitude}
              onAddNewPlace={onAddNewPlace}
            />
            <Separator className="my-2" />
          </>
        );
      })}
    </ScrollArea>
  ) : (
    <p className="my-4 text-md font-medium leading-none text-center">
      There wasn't anything found
    </p>
  );
};

export default CitiesList;
