import { IDepartures, IJsonTicket, ITrips } from "./ITicket";

export const decodeTrips = (json: IJsonTicket): ITrips => {
  const mappedCities = new Map();
  json.cities.forEach(city =>
    mappedCities.set(city.id, {
      id: city.id,
      name: city.name
    })
  );

  return {
    ...decodeDepartures(json),
    originCity: mappedCities.get(json.origin_city_id),
    arrivalCity: mappedCities.get(json.destination_city_id)
  };
};

export const decodeDepartures = (json: IJsonTicket): IDepartures => {
  const mappedLocations = new Map();
  json.locations.forEach(location =>
    mappedLocations.set(location.id, {
      id: location.id,
      name: location.name
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

  const mappedOperators = new Map();
  json.operators.forEach(operator =>
    mappedOperators.set(operator.id, {
      id: operator.id,
      displayName: operator.display_name,
      logoUrl: operator.logo_url,
      name: operator.name
    })
  );

  return {
    departures: mappedDepartures,
    operators: mappedOperators,
    locations: mappedLocations,
    isComplete: json.complete
  };
};
