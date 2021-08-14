export type Departure = {
  id: string
  class: string
  class_name: string
  available_seats: number
  prices: {
    currency: string
    total: number
    breakdown: Record<string, number>
    discounted: boolean
  }
  departure_timezone: string
  arrival_timezone: string
  departure_time: string
  arrival_time: string
  origin_location_id: number
  destination_location_id: number
}

export type Location = {
  id: number
  city_id: string
  name: string
  address: [string, string]
  type: string
  lat: number
  lon: number
  geohash: string
}
