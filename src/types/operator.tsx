import { Amenity } from "./index";

type AmenitiesByClasses = {
  Normal: Amenity;
  Economy: Amenity;
};

type OperatorTerms = {
  refund: boolean;
  exchange: boolean;
  bag_allowed: boolean;
  piece_of_id: boolean;
  boarding_requirement: string; // enum ? "printed_tkt"
  extra_bag_policy: boolean;
  use_new_ticket: boolean;
  exchange_cutoff: number;
  nb_checked_bags: number;
  kg_by_bag: number;
  nb_carry_on: number;
  extra_bag_cost: number;
};

export type Operator = {
  id: string;
  source_id: number;
  profile_id: number;
  name: string;
  url?: string; // TODO check
  logo_url: string;
  display_name: string;
  sellable: boolean;
  fuzzy_prices: boolean;
  sell_tickets_cutoff: {
    hours: number;
  };
  amenities: AmenitiesByClasses;
  source: string;
  referral_deal: boolean;
  display_url?: string; // TODO check
  fraud_check: string;
  terms: OperatorTerms;
};
