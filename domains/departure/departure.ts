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

export type DepartureResponse = {
  id: string
  source_id: number
  checkout_type: string
  operator_id: string
  origin_location_id: number
  destination_location_id: number
  class: string
  class_name: string
  amenities: AmenityClassResponse
  available_seats: number
  prices: {
    total: number
    breakdown: {
      base: number
    },
    categories: object
    discounted: boolean
  },
  links: {
    deeplink: string
  },
  ticket_types: string[]
  departure_timezone: string
  arrival_timezone: string
  departure_time: string
  arrival_time: string
}

export class Departure {
  static fromApi(rawDeparture: DepartureResponse) {
    return new Departure(
      rawDeparture.departure_time,
      rawDeparture.arrival_time,
      rawDeparture.prices.total,
      rawDeparture.links.deeplink,
    );
  }

  constructor(
    public departureTime: string,
    public arrivalTime: string,
    public priceTotal: number,
    public link: string,
  ) {}
}
