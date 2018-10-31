export interface Departure {
  origin_city_id: string;
  destination_city_id: string;
  cities: City[];
  locations: Location[];
  operators: string[];
  departures: any[];
  complete: boolean;
  ttl: number;
  is_valid_route: boolean;
}

export interface City {
  id: string;
  region_id: number;
  name: string;
  lat: number;
  lon: number;
  geohash: string;
  timezone: string;
  image_url: string;
  hero_image_url: string;
  legacy_url_form: string;
  country_code2: string;
  full_name: string;
  locale: string;
  region: Region;
}

export interface Region {
  id: number;
  region_code: string;
  country_code2: string;
  name: string;
  locale: string;
  country: Country;
}

export interface Country {
  code2: string;
  code3: string;
  name: string;
  continent: string;
  default_locale: string;
  default_currency: string;
  population: number;
  locale: string;
}

export interface Location {
  id: number;
  city_id: string;
  name: string;
  address: string[];
  type: Type;
  lat: number | null;
  lon: number | null;
  geohash: null | string;
}

export enum Type {
  Airport = 'airport',
  BusStation = 'bus_station',
  BusStop = 'bus_stop',
  Other = 'other',
  SubwayStation = 'subway_station',
  TransitStation = 'transit_station',
}
