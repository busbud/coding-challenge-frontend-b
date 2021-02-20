export interface ApiResponse {
  origin_city_id: string;
  destination_city_id: string;
  cities: City[];
  locations: Location[];
  operators: Operator[];
  departures: Departure[];
  search_request_ids: string[];
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
  image_url: null | string;
  hero_image_url: string;
  legacy_url_form: string;
  country_code2: string;
  full_name: string;
  short_name: string;
  locale: string;
  region: Region;
}

export interface Region {
  id: number;
  region_code: string;
  country_code2: string;
  name: string;
  short_name: string;
  locale: string;
  country: Country;
}

export interface Country {
  code2: string;
  code3: string;
  name: string;
  short_name: string;
  continent: string;
  default_locale: string;
  default_currency: string;
  population: number;
  locale: string;
}

export interface Departure {
  amenities: EconomyClass;
  arrival_timezone: string;
  available_seats: number;
  vehicle: null;
  busbud_departure_id: string;
  class: string;
  class_name: string;
  complete: boolean;
  contractor_name: null;
  fare_name: null;
  deeplink: null;
  departure_timezone: string;
  departure_type: string;
  destination_location_id: number;
  duration: number;
  has_search_details: boolean;
  has_layout: null;
  has_transfers: boolean;
  has_addons: null;
  id: string;
  links: Links;
  num_transfers: number;
  operator_id: string;
  origin_location_id: number;
  passenger_questions: any[];
  schedule_id: null;
  sellable: boolean;
  source_id: number;
  ticket_types: string[];
  departure_time: string;
  arrival_time: string;
  fetched_at: string;
  search_request_id: string;
  unreliable_duration: null;
  has_unmapped_location: null;
  data_source: string;
  cache_source: string;
  operator_disclaimers: null;
  vehicle_type: string;
  bus: null;
  has_bus_details: null;
  prices: Prices;
  trip_stops: TripStop[];
  addons: any[];
  details: Details;
  terms: Terms;
}

export interface EconomyClass {
  display_name: string;
  wifi: boolean;
  toilet: boolean;
  ac: boolean;
  refreshment: boolean;
  food: boolean;
  hot_meal: boolean;
  power_outlets: boolean;
  tv: boolean;
  bus_attendant: boolean;
  leg_room: boolean;
  small_seat: boolean;
  average_seat: boolean;
  xl_seat: boolean;
  full_recline_seat: boolean;
  carpool: boolean;
}

export interface Details {}

export interface Links {
  deeplink: string;
}

export interface Prices {
  currency: string;
  total: number;
  categories: Categories;
  discount: number;
  roundtrip_min: null;
  roundtrip_min_fees_included: null;
  roundtrip_total: null;
  roundtrip_total_fees_included: null;
  discounted: null;
  breakdown: Breakdown;
}

export interface Breakdown {
  base: number;
  fees: number;
  taxes: number;
  discount: number;
}

export interface Categories {
  adult: number;
  baby: number;
  child: number;
  senior: number;
}

export interface Terms {
  type_of_id: string;
  ticket_requirements: TicketRequirements;
  nb_carry_on: number;
  kg_by_carry_on: null;
  nb_checked_bags: number;
  kg_by_bag: number;
  checked_in_size_cm: CheckedInSizeCM;
  extra_checked_in_fees: ExtraCheckedInFeesClass;
  nb_extra_checked_in: null;
  total_checked_in_kg: null;
  oversized_luggage: OversizedLuggage;
  animals: Animals;
  refund_policies: Policy[];
  refund: boolean;
  refund_cutoff: number;
  exchange_policies: Policy[];
  exchange: boolean;
  exchange_cutoff: number;
  exchange_cutoff_at: string;
  refund_cutoff_at: string;
  currency: string;
  addons: Details;
  piece_of_id: boolean;
  boarding_requirement: string;
  extra_bag_policy: boolean;
  extra_bag_cost: number;
  extra_bag_kg_cost: null;
  bag_allowed: boolean;
}

export interface Animals {
  fees: AnimalsFees;
  main_compartment_allowed: boolean;
  hold_compartment_allowed: boolean;
  main_max_weight_kg: null;
  main_small_cage_required: null;
  hold_max_weight_kg: null;
  vaccination_required: boolean;
  special_animals_allowed: boolean;
  early_arrival_required: boolean;
  specific_hours: null;
}

export interface AnimalsFees {
  type: string;
  amount: null;
  percent: null;
}

export interface CheckedInSizeCM {
  l: number;
  w: number;
  h: number;
}

export interface Policy {
  type: string;
  flat_fee: null;
  flat_fee_currency: string;
  percent_fee: number | null;
  cutoff_reference: string;
  cutoff_from: null;
  cutoff_to: number;
  external_link: null;
}

export interface ExtraCheckedInFeesClass {
  type: string;
  amount: number;
}

export interface OversizedLuggage {
  allowed: boolean;
  allowed_types: any[];
  fees: ExtraCheckedInFeesClass;
  early_arrival_required: boolean;
  cover_required: boolean;
}

export interface TicketRequirements {
  eticket: string;
}

export interface TripStop {
  arrival_time: string | null;
  departure_time: string | null;
  duration: number;
  departure_operator_id: null;
  location_id: number;
  geohash: string;
  name: string;
  transfer: boolean;
}

export interface Location {
  id: number;
  city_id: string;
  name: string;
  address: string[];
  type: string;
  lat: number | null;
  lon: number | null;
  geohash: null | string;
}

export interface Operator {
  id: string;
  source_id: number;
  profile_id: number;
  name: string;
  url: string;
  logo_url: string;
  display_name: string;
  review_state: string;
  sellable: boolean;
  fuzzy_prices: boolean;
  sell_tickets_cutoff: SellTicketsCutoff;
  amenities: OperatorAmenities;
  default_vehicle_type: string;
  source: string;
  referral_deal: boolean;
  referral_deal_type: null;
  display_url: string;
  fraud_check: null;
  passenger_phone_required: boolean;
}

export interface OperatorAmenities {
  classes: Classes;
}

export interface Classes {
  Economy: EconomyClass;
  FLEX: EconomyClass;
  PROMO: EconomyClass;
  "PROMO+": EconomyClass;
  Regular: EconomyClass;
  Standard: EconomyClass;
}

export interface SellTicketsCutoff {
  minutes: number;
}
