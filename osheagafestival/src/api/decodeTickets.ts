import { IJsonTicket, IDeparturesResults } from "./ITicket";

export const decodeTrips = (json: IJsonTicket): IDeparturesResults => {
  const mappedOperators = new Map();
  json.operators.forEach(operator =>
    mappedOperators.set(operator.id, {
      id: operator.id,
      displayName: operator.display_name,
      logoUrl: operator.logo_url,
      name: operator.name
    })
  );

  const mappedLocations = new Map();
  json.locations.forEach(location =>
    mappedLocations.set(location.id, {
      id: location.id,
      name: location.name
    })
  );

  const mappedCities = new Map();
  json.cities.forEach(city =>
    mappedCities.set(city.id, {
      id: city.id,
      name: city.name
    })
  );

  const mappedDepartures = json.departures.map(departure => ({
    id: departure.id,
    arrivalTime: new Date(departure.arrival_time),
    departureTime: new Date(departure.departure_time),
    operatorId: departure.operator_id,
    arrivalLocationId: departure.destination_location_id,
    departureLocationId: departure.origin_location_id,
    cityId: departure.city_id,
    prices: departure.prices
  }));

  return {
    departures: mappedDepartures,
    operators: mappedOperators,
    locations: mappedLocations,
    originCity: mappedCities.get(json.origin_city_id),
    arrivalCity: mappedCities.get(json.destination_city_id),
    isComplete: json.complete
  };
};

/*
export const decodeTrips = (json: IJsonTicket): IDeparturesResults => ({
  originCity: {
    id: json.origin_city_id,
    name: json.cities.find(city => city.id === json.origin_city_id)?.name
  },
  destinationCity: {
    id: json.destination_city_id,
    name: json.cities.find(city => city.id === json.destination_city_id)?.name
  },
  departures: mapDepartures(json.operators, json.departures),
  complete: json.complete
});
*/
