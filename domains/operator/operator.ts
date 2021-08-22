type AmenityClassResponse = {
  display_name: string
  wifi: boolean
  toilet: boolean
  ac: boolean
  refreshment: boolean
  food: boolean
  power_outlets: boolean
  tv: boolean
  bus_attendant: boolean
  leg_room: boolean
}

export type OperatorResponse = {
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
  sell_tickets_cutoff: {
    minutes: number
  },
  amenities: {
    classes: {
      Economy?: AmenityClassResponse
      Normal?: AmenityClassResponse
    }
  },
  default_vehicle_type: string
  passenger_address_required: boolean
  source: string
  referral_deal: boolean
  referral_deal_type: null
  display_url: string
  fraud_check: null
  passenger_phone_required: boolean
}

export class Operator {
  static fromApi(rawOperator: OperatorResponse) {
    return new Operator(rawOperator.display_name);
  }

  constructor(
    public displayName: string,
    public url: string,
    public logo_url: string,
  ) {}
}
