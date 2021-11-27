import type { DeparturesResponse, Search } from "../types";

export function getBaseQuery(parameters: Search) {
  return {
    url: `/x-departures/${parameters.origin}/${parameters.destination}/${parameters.date}`,
    params: {
      adult: parameters.passengers,
    },
  };
}

export function getPollQuery(parameters: Search & { index: number }) {
  const baseQuery = getBaseQuery(parameters);
  return {
    url: `${baseQuery.url}/poll`,
    params: {
      adult: parameters.passengers,
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
