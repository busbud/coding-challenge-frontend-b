export interface ISearchResponseDTO {
  cities: ICity[];
  complete: boolean;
  departures: IDeparture[];
  destination_city_id: string;
  is_valid_route: boolean;
  locations: ILocation[];
  metadata: object;
  operators: any;
  origin_city_id: string;
  ttl: number;
}

export interface ICity {
  action_type: string;
  country_code2: string;
  full_name: string;
  geohash: string;
  hero_image_url: string;
  id: string;
  image_url: any;
  lat: number;
  legacy_url_form: string;
  locale: string;
  lon: number;
  name: string;
  region: IRegion;
  region_id: number;
  short_name: string;
}

export interface ICountry {
  code2: string;
  code3: string;
  continent: string;
  default_currency: string;
  default_locale: string;
  locale: string;
  name: string;
  population: number;
  short_name: string;
}

export interface IRegion {
  country: ICountry;
  country_code2: string;
  id: number;
  locale: string;
  name: string;
  region_code: string;
  short_name: string;
}

export interface IDeparture {
  addons: any;
  amenities: IAmenities;
  arrival_time: string;
  arrival_timezone: string;
  available_seats: number;
  bus: any;
  busbud_departure_id: string;
  cache_source: string;
  class: string;
  class_name: string;
  complete: boolean;
  contractor_name: any;
  data_source: string;
  deeplink: any;
  departure_time: string;
  departure_timezone: string;
  departure_type: string;
  destination_location_id: number;
  details: object;
  duration: number;
  fare_name: any;
  fetched_at: string;
  has_addons: any;
  has_bus_details: any;
  has_layout: any;
  has_search_details: boolean;
  has_transfers: boolean;
  has_unmapped_location: any;
  id: string;
  links: {
    deepLinks: string;
  };
  num_transfers: number;
  operator_disclaimers: any;
  operator_id: string;
  origin_location_id: number;
  passenger_questions: any;
  prices: {
    currency: string;
    categories: {
      adult: number;
    };
    discount: number;
    roundtrip_min: any;
    roundtrip_min_fees_included: any;
    roundtrip_total: any;
    roundtrip_total_fees_included: any;
    total: number;
  };
  schedule_id: any;
  search_request_id: string;
  sellable: boolean;
  source_id: number;
  terms: any;
  ticket_types: any;
  trip_stops: any;
  unreliable_duration: any;
  vehicle: any;
  vehicle_type: string;
}

export interface IAmenities {
  ac: boolean;
  average_seat: boolean;
  bus_attendant: boolean;
  carpool: boolean;
  display_name: string;
  food: boolean;
  full_recline_seat: boolean;
  hot_meal: boolean;
  leg_room: boolean;
  power_outlets: boolean;
  refreshment: boolean;
  small_seat: boolean;
  toilet: boolean;
  tv: boolean;
  wifi: boolean;
}

export interface ILocation {
  address: string[];
  city_id: string;
  geohash: string;
  id: number;
  lat: number;
  lon: number;
  name: string;
}
