// NOTE: Linting disabled due to external data requirements
/* eslint-disable @typescript-eslint/naming-convention */
import { TAmenity } from "./Amenity";

export type TOperator = {
  id: string;
  source_id: number;
  profile_id: number;
  name: string;
  url: null | string;
  logo_url: string;
  display_name: string;
  sellable: boolean;
  fuzzy_prices: boolean;
  sell_tickets_cutoff: {
    hours: number;
  };
  amenities: {
    classes: Record<string, TAmenity>;
  };
  source: string;
  referral_deal: boolean;
  display_url: null | string;
  fraud_check: string;
  terms: {
    bag_allowed: boolean;
    boarding_requirement: string;
    exchange: boolean;
    exchange_cutoff: number;
    extra_bag_cost: number;
    extra_bag_policy: boolean;
    kg_by_bag: number;
    nb_carry_on: number;
    nb_checked_bags: number;
    piece_of_id: boolean;
    refund: boolean;
    use_new_ticket: boolean;
  };
};
