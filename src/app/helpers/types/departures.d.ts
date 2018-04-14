
  export interface Amenities {
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
  }

  export interface Links {
      deeplink: string;
  }

  export interface Categories {
      adult: number;
      child: number;
      senior: number;
  }

  export interface Breakdown {
      base: number;
      fees: number;
      taxes: number;
      discount: number;
  }

  export interface Prices {
      currency: string;
      total: number;
      categories: Categories;
      discount: number;
      roundtrip_min?: any;
      roundtrip_total?: any;
      discounted?: any;
      breakdown: Breakdown;
  }

  export interface Details {
      num_transfers: number;
  }

  export interface TicketRequirements {
      print: string;
      voucher: string;
      claim: string;
  }

  export interface ExtraCheckedInFees {
      type: string;
      amount: number;
  }

  export interface Fees {
      type: string;
      amount?: any;
  }

  export interface OversizedLuggage {
      allowed: boolean;
      allowed_types: string[];
      fees: Fees;
      early_arrival_required: boolean;
      cover_required: boolean;
  }

  export interface Fees2 {
      type: string;
      amount?: any;
      percent?: any;
  }

  export interface Animals {
      fees: Fees2;
      main_compartment_allowed: boolean;
      hold_compartment_allowed: boolean;
      main_max_weight_kg?: any;
      main_small_cage_required?: any;
      hold_max_weight_kg?: any;
      vaccination_required: boolean;
      special_animals_allowed: boolean;
      early_arrival_required: boolean;
      specific_hours?: any;
  }

  export interface RefundPolicy {
      type: string;
      flat_fee?: any;
      flat_fee_currency?: any;
      percent_fee?: any;
      cutoff_reference: string;
      cutoff_from?: any;
      cutoff_to?: any;
      external_link?: any;
  }

  export interface ExchangePolicy {
      type: string;
      flat_fee: number;
      flat_fee_currency: string;
      percent_fee?: any;
      cutoff_reference: string;
      cutoff_from?: any;
      cutoff_to: number;
      external_link?: any;
  }

  export interface Addons {
  }

  export interface Terms {
      type_of_id: string;
      ticket_requirements: TicketRequirements;
      nb_carry_on: number;
      kg_by_carry_on: number;
      nb_checked_bags: number;
      kg_by_bag: number;
      checked_in_size_cm?: any;
      extra_checked_in_fees: ExtraCheckedInFees;
      oversized_luggage: OversizedLuggage;
      animals: Animals;
      refund_policies: RefundPolicy[];
      refund: boolean;
      refund_cutoff?: any;
      exchange_policies: ExchangePolicy[];
      exchange: boolean;
      exchange_cutoff: number;
      exchange_cutoff_at: Date;
      currency: string;
      addons: Addons;
      piece_of_id: boolean;
      boarding_requirement: string;
      extra_bag_policy: boolean;
      extra_bag_cost: number;
      extra_bag_kg_cost?: any;
      bag_allowed: boolean;
  }

  export interface Departures {
      amenities: Amenities;
      arrival_timezone: string;
      available_seats: number;
      bus?: any;
      busbud_departure_id: string;
      class: string;
      class_name: string;
      fare_name?: any;
      deeplink?: any;
      departure_timezone: string;
      departure_type?: any;
      destination_location_id: number;
      duration: number;
      has_search_details: boolean;
      has_transfers: boolean;
      has_addons?: any;
      id: string;
      links: Links;
      num_transfers?: any;
      operator_id: string;
      origin_location_id: number;
      schedule_id?: any;
      sellable: boolean;
      source_id: number;
      ticket_types: string[];
      departure_time: Date;
      arrival_time: Date;
      fetched_at: Date;
      prices: Prices;
      trip_stops?: any;
      addons?: any;
      details: Details;
      terms: Terms;
      totalPrice: number;
  }

