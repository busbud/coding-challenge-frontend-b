type CityId = string;
type LocationId = number;

export interface City {
  id: CityId;
  name: string;
}

export interface Location {
  city_id: CityId;
  id: LocationId;
  name: string;
}

export interface Departure {
  arrival_time: string;
  arrival_timezone: string;
  departure_time: string;
  departure_timezone: string;
  destination_location_id: LocationId;
  id: string;
  links: {
    deeplink: string;
  };
  operator_id: string;
  origin_location_id: LocationId;
  prices: {
    currency: string;
    total: number;
  };
}

export interface Operator {
  display_name: string;
  id: string;
  logo_url: string;
}

export interface SearchResult {
  id: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  operatorLogo: string;
  operatorName: string;
  price: string;
  url: string;
}
