import { IJsonTicket, ITicketSearchResults } from "./ITicket";

const getHeaders = () => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set(
    "Accept",
    "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/"
  );
  requestHeaders.set("X-Busbud-Token", "PARTNER_AHm3M6clSAOoyJg4KyCg7w");

  return requestHeaders;
};

const decodeTrips = (json: IJsonTicket): ITicketSearchResults => ({
  originCity: {
    id: json.origin_city_id,
    name: json.cities.find(city => city.id === json.origin_city_id)?.name
  },
  destinationCity: {
    id: json.destination_city_id,
    name: json.cities.find(city => city.id === json.destination_city_id)?.name
  },
  departures: json.departures.map(departure => ({
    id: departure.id,
    prices: departure.prices,
    operator: json.operators
      .filter(operator => operator.id === departure["operator_id"])
      .map(operator => ({
        id: operator.id,
        displayName: operator.display_name,
        logoUrl: operator.logo_url,
        name: operator.name
      }))[0],
    departureTime: new Date(departure.departure_time),
    arrivalTime: new Date(departure.arrival_time)
  })),
  searchRequestIds: json.search_request_ids,
  complete: json.complete
});

export const getFirstTickets = (): Promise<ITicketSearchResults> =>
  fetch("https://napi.busbud.com/x-departures/dr5reg/f25dvk/2020-08-02", {
    headers: getHeaders()
  })
    .then(response => response.json())
    .then(decodeTrips);
