import { useEffect, useRef, useState } from "react";
import { searchCities } from "src/api/searchCities/searchCities";
import { useToast } from "src/hooks/use-toast";
import { Command, CommandInput } from "../ui/command/command";
import CitiesList from "./CitiesList";
import { SearchCitiesFetch } from "src/api/searchCities/types";
import { SkeletonCity } from "../ui/skeleton/Skeleton";
import { Separator } from "../ui/separator/separator";

const initialState: SearchCitiesFetch = {
  data: [],
  links: [],
  metadata: [],
};

const SearchCities = () => {
  const { toast } = useToast();
  const [word, setWord] = useState<string>("");
  const [cities, setCities] = useState<SearchCitiesFetch>(initialState);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isWasTypingRef = useRef<boolean>(false);

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

  return (
    <div>
      <Command className="rounded-lg border shadow-md">
        <CommandInput onValueChange={(e) => setWord(e)} placeholder="Search" />
        {isWasTypingRef.current && !isLoading ? (
          <CitiesList cities={cities.data} />
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
