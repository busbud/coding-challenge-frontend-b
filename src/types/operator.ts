export default interface IOperator {
  id: string;
  source_id: number;
  profile_id: number;
  name: string;
  url: string | null;
  logo_url: string;
  display_name: string;
  sellable: boolean;
  fuzzy_prices: boolean;
  sell_tickets_cutoff: {
    hours: number;
  };
  amenities: {
    classes: {
      Normal: {
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
      };
      Economy: {
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
      };
    };
  };
  source: string;
  referral_deal: boolean;
  display_url: string | null;
  fraud_check: string;
  terms: {
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
  };
}
