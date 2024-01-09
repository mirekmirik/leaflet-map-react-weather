export type CitiesFetch = {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  country: string;
  name: string;
  population: string;
  region: string;
  regionCode: string;
  regionWdId: string;
  latitude: string;
  longitude: string;
};
export type LinksFetch = {
  rel: string;
  href: string;
};

export type MetadataFetch = {
  currentOffset: number;
  totalCount: number;
};

export interface SearchCitiesFetch {
  data: CitiesFetch[];
  links: LinksFetch[];
  metadata: MetadataFetch[];
}
