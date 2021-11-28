import type { DeparturesResponse, Search } from "../types";

export function getBaseQuery(parameters: Search) {
  return {
    url: `/x-departures/${parameters.origin}/${parameters.destination}/${parameters.date}`,
    params: {
      adult: parameters.adult,
    },
  };
}

export function getPollQuery(parameters: Search & { index: number }) {
  const baseQuery = getBaseQuery(parameters);
  return {
    url: `${baseQuery.url}/poll`,
    params: {
      adult: parameters.adult,
      index: parameters.index,
    },
  };
}

export function getLocationNamesById(
  locations: DeparturesResponse["locations"] = []
): { [key: number]: string } {
  return locations.reduce(
    (acc, location) => ({ ...acc, [location.id]: location.name }),
    {}
  );
}
