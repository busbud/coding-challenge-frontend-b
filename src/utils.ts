import type { DeparturesResponse, Search } from "./types";

export function getBaseQuery(parameters: Search) {
  return {
    url: `/x-departures/${parameters.origin}/${parameters.destination}/${parameters.date}`,
    parameters: {
      adult: parameters.passengers,
    },
  };
}

export function getPollQuery(parameters: Search) {
  const baseQuery = getBaseQuery(parameters);
  return {
    url: `${baseQuery.url}/poll`,
    parameters: {
      adult: parameters.passengers,
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
