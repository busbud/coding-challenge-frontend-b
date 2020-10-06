import { City, Location, Operator, XDeparture } from "./index";

export type QueryDepartureParams = {
  origin: string;
  destination: string;
  outbound_date: string; // ISO 8601 Outbound departure date
  adult?: number;
  child?: number;
  senior?: number;
  lang?: string; // ISO 3166-1 alpha-2 language code
  currency?: string; // ISO 4217 currency code
};

export type QueryDepartureResult = {
  origin_city_id: string;
  destination_city_id: string;
  cities: City[];
  locations: Location[];
  operators: Operator[];
  departures: XDeparture[];
  complete: boolean; // <!-- determines if all departures have been received from all relevant bus companies
  ttl: number;
  is_valid_route: boolean;
};
