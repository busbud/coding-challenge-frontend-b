interface City {
  id: string;
  name: string;
  geohash: string;
  timezone: string;
  full_name: string;
  short_name: string;
}

interface Location {
  id: number;
  city_id: string;
  name: string;
  addresss: string[];
  geohash: string;
}

interface Operator {
  id: string;
  display_name: string;
  logo_url: string;
  url: string;
}

interface XDeparture {
  id: string;
  duration: number;
  operator_id: string;
  prices: { total: number };
  available_seats: number;
  departure_timezone: string; // IANA string
  arrival_timezone: string; // IANA string
  departure_time: string; // wallclock time
  arrival_time: string; // wallclock time
  origin_location_id: number;
  destination_location_id: number;
  operator_id: string;
}

interface DepartureSearchResponse {
  origin_city_id: string;
  destination_city_id: string;
  cities: City[];
  locations: Location[];
  departures: XDeparture[];
  operators: Operator[];
  complete: boolean;
}

// Params ---------------------------
interface DepartureSearchInitParams {
  origin: string;
  destination: string;
  outboundDate: string;
  adults: number;
}
interface DepartureSearchPollParams extends DepartureSearchInitParams {
  index: number;
}

// Third party ----------------------
declare module "react-reveal/Fade";
