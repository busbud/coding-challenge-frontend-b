import { IDepartures, ITrips } from "./ITicket";

import { decodeDepartures, decodeTrips } from "./decodeTickets";

const getHeaders = () => {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set(
    "Accept",
    "application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/"
  );
  requestHeaders.set("X-Busbud-Token", "PARTNER_AHm3M6clSAOoyJg4KyCg7w");

  return requestHeaders;
};

export const getFirstTickets = (language: string): Promise<ITrips> =>
  fetch(
    `https://napi.busbud.com/x-departures/dr5reg/f25dvk/2020-08-02?lang=${language}`,
    {
      headers: getHeaders()
    }
  )
    .then(response => response.json())
    .then(decodeTrips);

export const getMoreTickets = (
  language: string,
  index: number
): Promise<IDepartures> =>
  fetch(
    `https://napi.busbud.com/x-departures/dr5reg/f25dvk/2020-08-02/poll?lang=${language}&index=${index}`,
    {
      headers: getHeaders()
    }
  )
    .then(response => response.json())
    .then(decodeDepartures);
