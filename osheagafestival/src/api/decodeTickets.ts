import {
  IJsonTicket,
  IJsonFetchMoreTicket,
  IJsonDeparture,
  IDeparturesResults,
  ITicketSearchResults,
  IJsonOperator
} from "./ITicket";

const mapDepartures = (
  operators: ReadonlyArray<IJsonOperator>,
  departures: ReadonlyArray<IJsonDeparture>
) =>
  departures.map(departure => ({
    id: departure.id,
    prices: departure.prices,
    operator: operators
      .filter(operator => operator.id === departure["operator_id"])
      .map(operator => ({
        id: operator.id,
        displayName: operator.display_name,
        logoUrl: operator.logo_url,
        name: operator.name
      }))[0],
    departureTime: new Date(departure.departure_time),
    arrivalTime: new Date(departure.arrival_time)
  }));

export const decodeDepartures = (
  json: IJsonFetchMoreTicket
): IDeparturesResults => ({
  departures: mapDepartures(json.operators, json.departures),
  complete: json.complete
});

export const decodeTrips = (json: IJsonTicket): ITicketSearchResults => ({
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
