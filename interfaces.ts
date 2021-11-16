/* eslint-disable camelcase */

interface Metadata {
  complete: boolean
  ttl: string
  interval: number
  links: Links2
}

interface Links2 {
  cache_state_poll: string
}

interface Departure {
  amenities: Economy
  arrival_timezone: string
  available_seats: number
  vehicle?: any
  busbud_departure_id: string
  class: string
  class_name: string
  complete: boolean
  contractor_name?: any
  fare_name?: any
  deeplink?: any
  departure_timezone: string
  departure_type: string
  destination_location_id: number
  duration: number
  has_search_details: boolean
  has_layout?: any
  has_transfers: boolean
  has_addons?: any
  id: string
  links: Links
  num_transfers: number
  operator_id: string
  origin_location_id: number
  passenger_questions: any[]
  schedule_id?: any
  sellable: boolean
  source_id: number
  ticket_types: string[]
  departure_time: string
  arrival_time: string
  fetched_at: string
  search_request_id: string
  unreliable_duration?: any
  has_unmapped_location?: any
  data_source: string
  cache_source: string
  operator_disclaimers?: any
  vehicle_type: string
  origin_mapped_by: string
  destination_mapped_by: string
  bus?: any
  has_bus_details?: any
  prices: Prices
  trip_stops: Tripstop[]
  addons: any[]
  details: Details
  terms: Terms
}

interface Terms {
  type_of_id: string
  ticket_requirements: Ticketrequirements
  nb_carry_on: number
  kg_by_carry_on?: any
  nb_checked_bags: number
  kg_by_bag: number
  checked_in_size_cm: Checkedinsizecm
  extra_checked_in_fees: Extracheckedinfees
  nb_extra_checked_in?: any
  total_checked_in_kg?: any
  oversized_luggage: Oversizedluggage
  animals: Animals
  refund_policies: Refundpolicy[]
  refund: boolean
  refund_cutoff?: number
  exchange_policies: Exchangepolicy[]
  exchange_disclaimers: any[]
  exchange: boolean
  exchange_cutoff?: number
  exchange_cutoff_at?: string
  refund_cutoff_at?: string
  currency: string
  addons: Details
  custom_disclaimers?: any
  piece_of_id: boolean
  boarding_requirement: string
  extra_bag_policy: boolean
  extra_bag_cost: number
  extra_bag_kg_cost?: any
  bag_allowed: boolean
}

interface Exchangepolicy {
  type: string
  flat_fee?: any
  flat_fee_currency: string
  percent_fee?: any
  cutoff_reference: string
  cutoff_from?: any
  cutoff_to: number
  external_link?: any
}

interface Refundpolicy {
  type: string
  flat_fee?: any
  flat_fee_currency: string
  percent_fee?: number
  cutoff_reference: string
  cutoff_from?: any
  cutoff_to: number
  external_link?: any
}

interface Animals {
  fees: Fees
  main_compartment_allowed: boolean
  hold_compartment_allowed: boolean
  main_max_weight_kg?: any
  main_small_cage_required?: any
  hold_max_weight_kg?: any
  vaccination_required: boolean
  special_animals_allowed: boolean
  early_arrival_required: boolean
  specific_hours?: any
}

interface Fees {
  type: string
  amount?: any
  percent?: any
}

interface Oversizedluggage {
  allowed: boolean
  allowed_types: any[]
  fees: Extracheckedinfees
  early_arrival_required: boolean
  cover_required: boolean
}

interface Extracheckedinfees {
  type: string
  amount: number
}

interface Checkedinsizecm {
  l: number
  w: number
  h: number
}

interface Ticketrequirements {
  eticket: string
}

interface Details {}

interface Tripstop {
  arrival_time?: string
  departure_time?: string
  duration: number
  departure_operator_id?: any
  location_id: number
  geohash: string
  name: string
  transfer: boolean
  service_name?: any
  service_number?: any
}

interface Prices {
  currency: string
  total: number
  categories: Categories
  discount: number
  roundtrip_min?: any
  roundtrip_min_fees_included?: any
  roundtrip_total?: any
  roundtrip_total_fees_included?: any
  discounted?: any
  breakdown: Breakdown
}

interface Breakdown {
  base: number
  fees: number
  taxes: number
  discount: number
}

interface Categories {
  adult: number
}

interface Links {
  deeplink: string
}

interface Operator {
  id: string
  source_id: number
  profile_id: number
  name: string
  url: string
  logo_url: string
  display_name: string
  review_state: string
  sellable: boolean
  fuzzy_prices: boolean
  sell_tickets_cutoff: Sellticketscutoff
  amenities: Amenities
  default_vehicle_type: string
  passenger_address_required: boolean
  source: string
  referral_deal: boolean
  referral_deal_type?: any
  display_url: string
  fraud_check?: any
  passenger_phone_required: boolean
}

interface Amenities {
  classes: Classes
}

interface Classes {
  Economy: Economy
  FLEX: Economy
  PROMO: Economy
  'PROMO+': Economy
  Regular: Economy
  Standard: Economy
}

interface Economy {
  display_name: string
  wifi: boolean
  toilet: boolean
  ac: boolean
  refreshment: boolean
  food: boolean
  hot_meal: boolean
  power_outlets: boolean
  tv: boolean
  bus_attendant: boolean
  leg_room: boolean
  small_seat: boolean
  average_seat: boolean
  xl_seat: boolean
  full_recline_seat: boolean
  carpool: boolean
}

interface Sellticketscutoff {
  minutes: number
}

interface Location {
  id: number
  city_id: string
  name: string
  address: string[]
  type: string
  lat?: number
  lon?: number
  geohash?: string
  created_by: string
}

interface Country {
  code2: string
  code3: string
  name: string
  short_name: string
  continent: string
  default_locale: string
  default_currency: string
  population: number
  locale: string
}

interface Region {
  id: number
  region_code: string
  country_code2: string
  name: string
  short_name: string
  locale: string
  country: Country
}

interface City {
  id: string
  region_id: number
  name: string
  lat: number
  lon: number
  geohash: string
  timezone: string
  image_url?: string
  hero_image_url: string
  legacy_url_form: string
  country_code2: string
  full_name: string
  short_name: string
  locale: string
  region: Region
}

export interface Travel {
  origin_city_id: string
  destination_city_id: string
  cities: City[]
  locations: Location[]
  operators: Operator[]
  departures: Departure[]
  complete: boolean
  ttl: number
  is_valid_route: boolean
  metadata: Metadata
}

export interface Destination {
  id: string
  departureTime: string
  arrivalTime: string
  originLocationName: string
  destinationLocationName: string
  price: number
}

export enum FetchStatus {
  initial,
  loading,
  success,
  error,
}
