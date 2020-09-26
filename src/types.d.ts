interface City {
  id: string;
  name: string;
  geohash: string;
  timezone: string;
  full_name: string;
}

interface Location {
  id: string;
  city_id: string;
  name: string;
  addresss: string[];
  geohash: string;
}

interface Operator {
  id: string;
  name: string;
  logo_url: string;
}

interface XDeparture {
  id: string;
  operator_id: string;
  prices: { total: number };
  available_seats: number;
  departure_timezone: string; // IANA string
  arrival_timezone: string; // IANA string
  departure_time: string; // wallclock time
  arrival_time: string; // wallclock time
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
}
interface DepartureSearchPollParams extends DepartureSearchInitParams {
  index: number;
}
