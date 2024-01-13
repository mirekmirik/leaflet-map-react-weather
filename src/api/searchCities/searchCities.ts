
// const url =
//   "https://test.api.amadeus.com/v1/reference-data/locations/cities?countryCode=FR&keyword=PARIS&max=10&include=";

import { SearchCitiesFetch } from "./types";

const searchCitiesLink = (
  cityStartsWith: string
) => {
  return `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${cityStartsWith}&limit=10`;
};

export const searchCities = async (
  cityStartsWith: string,
  maxSymbols: number = 7,
  countryCode?: string
): Promise<SearchCitiesFetch> => {
  try {
    const response = await fetch(searchCitiesLink(cityStartsWith), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.REACT_APP_API_CITIES as string,
      },
    });
    if (!response.ok) {
      const data = await response.json();
      const error = data.errors[0];
      throw new Error(error.message);
    }
    const data = await response.json();
    return data;
  } catch (err: any) {
    throw err.message;
  }
};
