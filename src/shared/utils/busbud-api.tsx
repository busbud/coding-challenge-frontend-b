import { buildLink } from "./build-link";

const BUSBUD_API_ENDPOINT = "https://napi.busbud.com";

type getInitialBusbudXDeparturesUrlParams = {
  origin: string; // Origin's geohash
  destination: string; // Destination's geohash
  outbound_date: string; // ISO 8601 Outbound departure date
  adult?: number;
  child?: number;
  senior?: number;
  lang?: string; // ISO 3166-1 alpha-2 language code
  currency?: string; // ISO 4217 currency code
};
type getPollingBusbudXDeparturesUrlParams = getInitialBusbudXDeparturesUrlParams & {
  isPolling: boolean;
  index: number;
};
// TODO should this be moved to types ?
export type getBusbudXDeparturesUrlParams =
  | getInitialBusbudXDeparturesUrlParams
  | getPollingBusbudXDeparturesUrlParams;

export const getBusbudXDeparturesUrl = ({
  origin,
  destination,
  outbound_date,
  isPolling = false,
  ...queryParams
}: getBusbudXDeparturesUrlParams): RequestInfo => {
  const baseUrl = `${BUSBUD_API_ENDPOINT}/x-departures/${origin}/${destination}/${outbound_date}`;

  if (!(origin && destination && outbound_date)) {
    return "";
  } else if (isPolling && queryParams?.index) {
    return buildLink(`${baseUrl}/poll`, queryParams);
  } else {
    return buildLink(baseUrl, queryParams);
  }
};
