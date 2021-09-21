import { Amenities } from "./Amenities"

export interface XDeparture {
  id: string,
  source_id: number,
  checkout_type: string,
  operator_id: string,
  origin_location_id: number,
  destination_location_id: number,
  class: string,
  class_name: string,
  amenities: Amenities,
  available_seats: number,
  prices: {
    total: number,
    breakdown: {
      base: number
    },
    categories: { [key: string]: string },
    discounted: boolean
  },
  ticket_types: string[],
  departure_timezone: string,
  arrival_timezone: string,
  departure_time: string,
  arrival_time: string
}
