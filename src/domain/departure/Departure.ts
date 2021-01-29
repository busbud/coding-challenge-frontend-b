export type Departure = {
  id: string
  operator_id: string
  origin_location_id: number
  destination_location_id: number
  departure_timezone: string
  arrival_timezone: string
  departure_time: string | Date
  arrival_time: string | Date
  prices: Prices
  trip_stops: object[]
}

export type Prices = {
  total: number
}
