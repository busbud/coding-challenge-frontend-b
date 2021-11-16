/* eslint camelcase: off */
export interface Country {
  code2: string;
  locale: string;
  code3: string;
  name: string;
  continent: string;
  default_locale: string;
  default_currency: string;
  population: number;
}

export interface Region {
  id: number;
  locale: string;
  country_code2: string;
  name: string;
  country: Country;
}

export interface City {
  id: string;
  locale: string;
  region_id: number;
  name: string;
  lat: number;
  lon: number;
  geohash: string;
  timezone: string;
  image_url: string;
  legacy_url_form: string;
  full_name: string;
  region: Region;
}

export interface Location {
  id: number;
  city_id: string;
  name: string;
  address: string[];
  type: string;
  lat: number;
  lon: number;
  geohash: string;
}

export interface SellTicketsCutoff {
  hours: number;
}

export interface Normal {
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

export interface Economy {
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

export interface Classes {
  Normal: Normal;
  Economy: Economy;
}

export interface Amenities {
  classes: Classes;
}

export interface Terms {
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

export interface Operator {
  id: string;
  source_id: number;
  profile_id: number;
  name: string;
  url?: any;
  logo_url: string;
  display_name: string;
  sellable: boolean;
  fuzzy_prices: boolean;
  sell_tickets_cutoff: SellTicketsCutoff;
  amenities: Amenities;
  source: string;
  referral_deal: boolean;
  display_url?: any;
  fraud_check: string;
  terms: Terms;
}

export interface AmenitiesXDeparture {
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

export interface Breakdown {
  base: number;
}

export interface Prices {
  total: number;
  breakdown: Breakdown;
  categories: object;
  discounted: boolean;
  currency: string;
}

export interface XDeparture {
  id: string;
  source_id: number;
  checkout_type: string;
  operator_id: string;
  origin_location_id: number;
  destination_location_id: number;
  class: string;
  class_name: string;
  amenities: AmenitiesXDeparture;
  available_seats: number;
  prices: Prices;
  ticket_types: string[];
  departure_timezone: string;
  arrival_timezone: string;
  departure_time: Date;
  arrival_time: Date;
}

export interface TicketsDTOOutput {
  origin_city_id: string;
  destination_city_id: string;
  cities: City[];
  locations: Location[];
  operators: Operator[];
  departures: XDeparture[];
  complete: boolean;
  ttl: number;
  is_valid_route: boolean;
}
