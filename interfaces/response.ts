/**
 * Generated using https://jvilk.com/MakeTypes/
 */

export interface Search {
    origin_city_id: string;
    destination_city_id: string;
    cities?: (CitiesEntity)[] | null;
    locations?: (LocationsEntity)[] | null;
    operators?: (OperatorsEntity)[] | null;
    departures?: (DeparturesEntity)[] | null;
    complete: boolean;
    ttl: number;
    is_valid_route: boolean;
    metadata: object;
  }
export interface CitiesEntity {
    id: string;
    region_id: number;
    name: string;
    lat: number;
    lon: number;
    geohash: string;
    timezone: string;
    image_url?: string | null;
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
export interface LocationsEntity {
    id: number;
    city_id: string;
    name: string;
    address?: (string | null)[] | null;
    type: string;
    lat?: number | null;
    lon?: number | null;
    geohash?: string | null;
    created_by: string;
  }
export interface OperatorsEntity {
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
    amenities: Amenities;
    default_vehicle_type: string;
    passenger_address_required: boolean;
    source: string;
    referral_deal: boolean;
    referral_deal_type?: null;
    display_url: string;
    fraud_check?: null;
    passenger_phone_required: boolean;
  }
export interface SellTicketsCutoff {
    minutes: number;
  }
export interface Amenities {
    classes: object;
  }

export interface AmenitiesClasses {
    Economy?: AmenityClass;
    FLEX?: AmenityClass;
    PROMO?: AmenityClass;
    "PROMO+"?: AmenityClass;
    Regular?: AmenityClass;
    Standard?: AmenityClass;
  }
export interface AmenityClass {
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

export interface DeparturesEntity {
    amenities: AmenitiesClasses;
    arrival_timezone: string;
    available_seats: number;
    vehicle?: null;
    busbud_departure_id: string;
    class: string;
    class_name: string;
    complete: boolean;
    contractor_name?: null;
    fare_name?: null;
    deeplink?: null;
    departure_timezone: string;
    departure_type: string;
    destination_location_id: number;
    duration: number;
    has_search_details: boolean;
    has_layout?: null;
    has_transfers: boolean;
    has_addons?: null;
    id: string;
    links: Links;
    num_transfers: number;
    operator_id: string;
    origin_location_id: number;
    passenger_questions?: (null)[] | null;
    schedule_id?: null;
    sellable: boolean;
    source_id: number;
    ticket_types?: (string)[] | null;
    departure_time: string;
    arrival_time: string;
    fetched_at: string;
    search_request_id: string;
    unreliable_duration?: null;
    has_unmapped_location?: null;
    data_source: string;
    cache_source: string;
    operator_disclaimers?: null;
    vehicle_type: string;
    origin_mapped_by: string;
    destination_mapped_by: string;
    bus?: null;
    has_bus_details?: null;
    prices: Prices;
    trip_stops?: (TripStopsEntity)[] | null;
    addons?: (null)[] | null;
    details: object;
    terms: Terms;
  }
export interface Links {
    deeplink: string;
  }
export interface Prices {
    currency: string;
    total: number;
    categories: Categories;
    discount: number;
    roundtrip_min?: null;
    roundtrip_min_fees_included?: null;
    roundtrip_total?: null;
    roundtrip_total_fees_included?: null;
    discounted?: null;
    breakdown: Breakdown;
  }
export interface Categories {
    adult: number;
  }
export interface Breakdown {
    base: number;
    fees: number;
    taxes: number;
    discount: number;
  }
export interface TripStopsEntity {
    arrival_time?: string | null;
    departure_time?: string | null;
    duration: number;
    departure_operator_id?: null;
    location_id: number;
    geohash: string;
    name: string;
    transfer: boolean;
    service_name?: null;
    service_number?: null;
  }

export interface Terms {
    type_of_id: string;
    ticket_requirements: TicketRequirements;
    nb_carry_on: number;
    kg_by_carry_on?: null;
    nb_checked_bags: number;
    kg_by_bag: number;
    checked_in_size_cm: CheckedInSizeCm;
    extra_checked_in_fees: FeesOrExtraCheckedInFees;
    nb_extra_checked_in?: null;
    total_checked_in_kg?: null;
    oversized_luggage: OversizedLuggage;
    animals: Animals;
    refund_policies?: (RefundPoliciesEntity)[] | null;
    refund: boolean;
    refund_cutoff: number;
    exchange_policies?: (ExchangePoliciesEntity)[] | null;
    exchange_disclaimers?: (null)[] | null;
    exchange: boolean;
    exchange_cutoff: number;
    exchange_cutoff_at: string;
    refund_cutoff_at: string;
    currency: string;
    addons: object;
    custom_disclaimers?: null;
    piece_of_id: boolean;
    boarding_requirement: string;
    extra_bag_policy: boolean;
    extra_bag_cost: number;
    extra_bag_kg_cost?: null;
    bag_allowed: boolean;
  }
export interface TicketRequirements {
    eticket: string;
  }
export interface CheckedInSizeCm {
    l: number;
    w: number;
    h: number;
  }
export interface FeesOrExtraCheckedInFees {
    type: string;
    amount: number;
  }
export interface OversizedLuggage {
    allowed: boolean;
    allowed_types?: (null)[] | null;
    fees: FeesOrExtraCheckedInFees;
    early_arrival_required: boolean;
    cover_required: boolean;
  }
export interface Animals {
    fees: Fees;
    main_compartment_allowed: boolean;
    hold_compartment_allowed: boolean;
    main_max_weight_kg?: null;
    main_small_cage_required?: null;
    hold_max_weight_kg?: null;
    vaccination_required: boolean;
    special_animals_allowed: boolean;
    early_arrival_required: boolean;
    specific_hours?: null;
  }
export interface Fees {
    type: string;
    amount?: null;
    percent?: null;
  }
export interface RefundPoliciesEntity {
    type: string;
    flat_fee?: null;
    flat_fee_currency: string;
    percent_fee: number;
    cutoff_reference: string;
    cutoff_from?: null;
    cutoff_to: number;
    external_link?: null;
  }
export interface ExchangePoliciesEntity {
    type: string;
    flat_fee?: null;
    flat_fee_currency: string;
    percent_fee?: null;
    cutoff_reference: string;
    cutoff_from?: null;
    cutoff_to: number;
    external_link?: null;
  }

export interface LocationShort {
    name: string;
    cityName: string;
  }

export interface OperatorShort {
    name: string;
    logo_url: string;
  }
  
export interface DeparturesFullEntity extends DeparturesEntity {
    operator: OperatorShort;
    originLocation: LocationShort;
    destinationLocation: LocationShort;
  }