import { Amenities } from "./Amenities"

export interface Operator {
  id: string,
  source_id: string,
  profile_id: string,
  name: string,
  url: string,
  logo_url: string,
  display_name: string,
  sellable: boolean,
  fuzzy_proces: boolean,
  sell_tickets_cutoff: {
    hours?: number
  },
  amenities: {
    classes: { [key: string]: Amenities }
  },
  source: string,
  referral_deal: boolean,
  display_url: string,
  fraud_check: string,
  terms: {
    refund: boolean,
    exchange: boolean,
    bag_allowed: boolean,
    piece_of_id: boolean,
    boarding_requirement: string,
    extra_bag_policy: boolean,
    use_new_ticket: boolean,
    exchange_cutoff: number,
    nb_checked_bags: number,
    kg_by_bag: number,
    nb_carry_on: number,
    extra_bag_cost: number
  }
}
