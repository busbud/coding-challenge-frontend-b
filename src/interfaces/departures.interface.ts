export interface Departures {
  complete: boolean;
  departures: DeparturesRes[];
  cities: CitiesRes[];
}

interface DeparturesRes {
  amenities: {
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
    carpool: false;
  };
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
  links: {
    deeplink: string;
  };
  num_transfers: number;
  operator_id: string;
  origin_location_id: number;
  passenger_questions: [];
  schedule_id: null;
  sellable: boolean;
  source_id: number;
  ticket_types: ["eticket"];
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
  prices: {
    currency: string;
    total: number;
    categories: {
      adult: number;
    };
    discount: number;
    roundtrip_min: null;
    roundtrip_min_fees_included: null;
    roundtrip_total: null;
    roundtrip_total_fees_included: null;
    discounted: null;
    breakdown: {
      base: number;
      fees: number;
      taxes: number;
      discount: number;
    };
  };
  trip_stops: [
    {
      arrival_time: null;
      departure_time: string;
      duration: number;
      departure_operator_id: null;
      location_id: number;
      geohash: string;
      name: string;
      transfer: boolean;
      service_name: null;
      service_number: null;
    }
  ];
  addons: [];
  details: {};
  terms: {
    type_of_id: string;
    ticket_requirements: {
      eticket: string;
    };
    nb_carry_on: number;
    kg_by_carry_on: null;
    nb_checked_bags: number;
    kg_by_bag: number;
    checked_in_size_cm: {
      l: number;
      w: number;
      h: number;
    };
    extra_checked_in_fees: {
      type: string;
      amount: number;
    };
    nb_extra_checked_in: null;
    total_checked_in_kg: null;
    oversized_luggage: {
      allowed: boolean;
      allowed_types: [];
      fees: {
        type: string;
        amount: number;
      };
      early_arrival_required: boolean;
      cover_required: true;
    };
    animals: {
      fees: {
        type: string;
        amount: null;
        percent: null;
      };
      main_compartment_allowed: boolean;
      hold_compartment_allowed: boolean;
      main_max_weight_kg: null;
      main_small_cage_required: null;
      hold_max_weight_kg: null;
      vaccination_required: boolean;
      special_animals_allowed: boolean;
      early_arrival_required: boolean;
      specific_hours: null;
    };
    refund_policies: [
      {
        type: string;
        flat_fee: null;
        flat_fee_currency: string;
        percent_fee: number;
        cutoff_reference: string;
        cutoff_from: null;
        cutoff_to: number;
        external_link: null;
      }
    ];
    refund: boolean;
    refund_cutoff: number;
    exchange_policies: [
      {
        type: string;
        flat_fee: null;
        flat_fee_currency: string;
        percent_fee: null;
        cutoff_reference: string;
        cutoff_from: null;
        cutoff_to: number;
        external_link: null;
      }
    ];
    exchange_disclaimers: [];
    exchange: boolean;
    exchange_cutoff: number;
    exchange_cutoff_at: string;
    refund_cutoff_at: string;
    currency: string;
    addons: {};
    piece_of_id: boolean;
    boarding_requirement: string;
    extra_bag_policy: boolean;
    extra_bag_cost: number;
    extra_bag_kg_cost: null;
    bag_allowed: true;
  };
}

interface CitiesRes {
  country_code2: string;
  full_name: string;
  geohash: string;
  hero_image_url: string;
  id: string;
  image_url: null;
  lat: number;
  legacy_url_form: string;
  locale: string;
  lon: number;
  name: string;
  region: {
    id: number;
    region_code: string;
    country_code2: string;
    name: string;
    short_name: string;
  };
  country: {
    code2: string;
    code3: string;
    name: string;
    short_name: string;
    continent: string;
    default_locale: string;
    default_currency: string;
    population: number;
    locale: string;
  };
  region_id: number;
  short_name: string;
  timezone: string;
}
