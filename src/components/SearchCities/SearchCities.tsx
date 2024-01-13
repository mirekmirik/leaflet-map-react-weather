import { useEffect, useRef, useState } from "react";
import { searchCities } from "src/api/searchCities/searchCities";
import { useToast } from "src/hooks/use-toast";
import { Command, CommandInput } from "../ui/command/command";
import CitiesList from "./CitiesList";
import { SearchCitiesFetch } from "src/api/searchCities/types";
import { SkeletonCity } from "../ui/skeleton/Skeleton";
import { Separator } from "../ui/separator/separator";
import { WeatherOfPlace } from "src/api/weather/types";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import {
  getSearchInputSelector,
  setShowInput,
} from "src/store/searchInput/searchInputSlice";
import { setShowDrawer } from "src/store/drawer/drawerSlice";

interface SearchCitiesProps {
  onAddNewPlace: (place: WeatherOfPlace) => void;
}

const initialState: SearchCitiesFetch = {
  data: [],
  links: [],
  metadata: [],
};

const SearchCities: React.FC<SearchCitiesProps> = ({ onAddNewPlace }) => {
  const { toast } = useToast();
  const [word, setWord] = useState<string>("");
  const [cities, setCities] = useState<SearchCitiesFetch>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isWasTypingRef = useRef<boolean>(false);
  const dispatch = useAppDispatch();
  const isShowInput = useAppSelector(
    (rootState) => getSearchInputSelector(rootState).isShowInput
  );

  useEffect(() => {
    if (!word.trim().length) {
      setCities(initialState);
      isWasTypingRef.current = false;
      return;
    }
    const delayDebounceFn = setTimeout(async () => {
      try {
        isWasTypingRef.current = true;
        setIsLoading(true);
        const cities = await searchCities(word);
        setCities(cities);
      } catch (err: any) {
        toast({
          title: err || "Error",
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [word]);

  const hideInput = () => {
    dispatch(setShowInput(true));
    dispatch(setShowDrawer(false));
  };

  return (
    <div className="search-cities" id="search-cities">
      <Command className="rounded-lg border shadow-md">
        <CommandInput
          onClick={hideInput}
          onValueChange={(e) => setWord(e)}
          placeholder="Search"
          id="search"
          data-value="search-cities"
        />
        {isWasTypingRef.current && !isLoading && isShowInput ? (
          <CitiesList cities={cities.data} onAddNewPlace={onAddNewPlace} />
        ) : null}
        {isLoading &&
          Array.from({ length: 5 }, (_, i) => (
            <div className="py-2 px-2" key={i}>
              <SkeletonCity />
              <Separator className="my-2" />
            </div>
          ))}
      </Command>
    </div>
  );
};

export default SearchCities;
