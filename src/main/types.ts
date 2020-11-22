export interface Cities {
  name: string;
  hash: string;
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
  region: {
    id: number;
    locale: string;
    country_code2: string;
    name: string;
    country: {
      code2: string;
      locale: string;
      code3: string;
      name: string;
      continent: string;
      default_locale: string;
      default_currency: string;
      population: number;
    };
  };
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

export interface XDeparture {
  id: string;
  source_id: number;
  checkout_type: string;
  operator_id: string;
  origin_location_id: number;
  destination_location_id: number;
  class: string;
  class_name: string;
  amenities: XDeparturesAmenities;
  available_seats: number;
  prices: Prices;
  ticket_types: string[];
  departure_timezone: string;
  arrival_timezone: string;
  departure_time: string;
  arrival_time: string;
}

export interface Prices {
  currency: string;
  total: number;
  breakdown: Breakdown;
  categories: Categories;
  discounted: boolean;
}

export interface Categories {}

export interface Breakdown {
  base: number;
}

export interface XDeparturesAmenities {
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
  sell_tickets_cutoff: Sellticketscutoff;
  amenities: Amenities;
  source: string;
  referral_deal: boolean;
  display_url?: any;
  fraud_check: string;
  terms: Terms;
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

export interface Amenities {
  classes: Classes;
}

export interface Classes {
  Normal: Normal;
  Economy: Normal;
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

export interface Sellticketscutoff {
  hours: number;
}

export interface Tickets {
  origin_city_id: string;
  destination_city_id: string;
  cities: City[];
  locations: Location[];
  departures: XDeparture[];
  complete: boolean;
  ttl: number;
  is_valid_route: boolean;
}

export interface SearchState {
  tickets: Tickets;
}

export interface State {
  search: SearchState;
}
