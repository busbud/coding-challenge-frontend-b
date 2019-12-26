import { IDeparturesResults, ITicketSearchResults } from "./ITicket";

import { decodeTrips, decodeDepartures } from "./decodeTickets";

const getHeaders = () => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set(
    "Accept",
    "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/"
  );
  requestHeaders.set("X-Busbud-Token", "PARTNER_AHm3M6clSAOoyJg4KyCg7w");

  return requestHeaders;
};

export const getFirstTickets = (): Promise<ITicketSearchResults> =>
  fetch(
    //"https://napi.busbud.com/x-departures/dr5reg/f25dvk/2020-06-07"
    "./__mocks__/20200708init.json",
    {
      headers: getHeaders()
    }
  )
    .then(response => response.json())
    .then(decodeTrips);

export const getMoreTickets = (index: number): Promise<IDeparturesResults> =>
  fetch(
    //`https://napi.busbud.com/x-departures/dr5reg/f25dvk/2020-06-07/poll?index=${index}`,
    "./__mocks__/20200708more.json",
    {
      headers: getHeaders()
    }
  )
    .then(response => response.json())
    .then(decodeDepartures);
