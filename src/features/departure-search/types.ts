export type Departure = {
  id: string
  busbud_departure_id: string
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
  operator_id: string
  vehicle_type: string
  duration: number
  trip_stops: object[]
  links: {
    deeplink: string
  }
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

export type City = {
  id: string
  locale: string
  region_id: number
  name: string
  lat: number
  lon: number
  geohash: string
  timezone: string
  image_url: string
  legacy_url_form: string
  full_name: string
  region: {
    id: number
    locale: string
    country_code2: string
    name: string
    country: {
      code2: string
      locale: string
      code3: string
      name: string
      continent: string
      default_locale: string
      default_currency: string
      population: number
    }
  }
}
