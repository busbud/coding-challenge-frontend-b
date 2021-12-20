/**
 * Using just one file because this is a simple challenge.
 * With normal development, it should be divided by scopes or following the same principles than app 
 * This helps new developers to quickly find what they need.
 * 
 * Note about ISO formatting: An specific typing could be generated, but those are only useful when validating,
 * not specifically when developing. 
 * 
 * Note about 'This probably could a type with more definition': I'm typing according to the response,
 * however this SHOULD be more defined to know exactly what to expect (For validation, mostly)
 */

export type RequestDeparturePath = {
  // Geohashes
  origin: string;
  destination: string;
  /** (ISO 8601) Date with format YYYY-MM-DDTHH:mm:ss. sssZ  */
  outbound_date: string;
}

export type RequestDepartureParams = {
  adult: number;
  child: number;
  senior: number;
  /** (ISO 639-1) 2 letter code language code (such as 'en', 'fr', 'es') */
  lang: string; 
  /* (ISO 4217) Currency code (such as 'CAD', 'USD', 'EUR') */
  currency: string;
}

export interface RequestDeparture extends RequestDeparturePath {
  index?: number;
  filters?: RequestDepartureParams;
}

export type Location = {
  id: number;
  city_id: string;
  name: string;
  address: Array<string>;
  // If types are known, an specific type should be made for this
  type: string;
  lat: number;
  lon: number;
  geohash: string;
}

export type Country = {
  code2: string;
  locale: string;
  code3: string;
  name: string;
  continent: string;
  default_locale: string;
  default_currency: string;
  population: number;
}

export type Region = {
  id: number;
  locale: string;
  country_code2: string;
  name: string;
  country: Country;
};

export type ResponseCity = {
  id: string;
  locale: string;
  region_id: Region['id'];
  name: string;
  lat: number;
  lon: number; 
  geohash: string;
  timezone: string;
  image_url: string;
  // Separated with commas, probably better to save as an array
  legacy_url_form: string;
  // Separated with commas, probably better to save as an array
  full_name: string;
  region: Region;
}

export type Amenity = {
  display_name: string;
  wifi: boolean;
  toilet: boolean;
  ac: boolean;
  food: boolean;
  refreshment: boolean;
  power_outlets: boolean;
  tv: boolean;
  bus_attendant: boolean;
  leg_room: boolean;
}

export type Terms = {
  refund: boolean;
  exchange: boolean;
  bag_allowed: boolean;
  piece_of_id: boolean;
  boarding_requirement: string;
  extra_bag_policy: boolean;
  use_new_ticket: boolean;
  exchange_cutoff: number;
  nb_checked_bags: number;
  kg_by_bag: number;
  nb_carry_on: number;
  extra_bag_cost: number;
}

export type Operator = {
  id: string;
  source_id: number;
  profile_id: number;
  name: string;
  url?: string;
  logo_url: string;
  display_name: string;
  sellable: boolean;
  fuzzy_prices: boolean;
  sell_tickets_cutoff: {
    hours: number;
  };
  amenities: {
    classes: Record<string, Amenity>;
  };
  source: string;
  referral_deal: boolean;
  display_url?: string;
  // This probably could a type with more definition
  fraud_check: string;
  terms: Terms;
}

export type XDeparture = {
  id: string;
  source_id: number;
  // This probably could a type with more definition
  checkout_type: string;
  operator_id: string;
  origin_location_id: number;
  destination_location_id: number;
  // This probably could a type with more definition
  class: string;
  class_name: string;
  amenities: Amenity;
  available_seats: number;
  prices: {
    total: number;
    breakdown: {
      base: number;
    };
    currency: string;
    categories: Record<string, number>;
    discounted: boolean;
  };
  // This probably could a type with more definition
  ticket_types: Array<string>;
  departure_timezone: string;
  arrival_timezone: string;
  departure_time: Date;
  arrival_time: Date;
}

export type ResponseSearch = {
  origin_city_id: string;
  destination_city_id: string;
  cities: Array<ResponseCity>;
  locations: Array<Location>;
  operators: Array<Operator>;
  departures: Array<XDeparture>;
  // Determines if all departures have been received from all relevant bus companies
  complete: boolean;
  ttl: number;
  is_valid_route: boolean;
}

export interface Departure {
  start: Date;
  end: Date;
  location: Location['name'];
  price: number;
  currency: string;
}

// If I would care about history search, I would probably do something like this.
// For this case, since I don't, I will use a simpler version assuming that I will always overwrite the search with
// my latest request (In a real case, this may not be always good)
/*
type SearchList = {
  [compositeId: string]: {
    [date: string]: ResponseSearch
  }
}
*/

export type SearchList = {
  // Composed by Origin and Destination Ids
  [compositeId: string]: ResponseSearch
}

