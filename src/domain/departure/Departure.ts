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

export const formatPrice = ({
  locale,
  value,
  currency,
}: {
  locale: string
  value: number
  currency: string
}) =>
  Intl.NumberFormat(locale, { style: 'currency', currency }).format(
    centsToFloat(value)
  )

export const centsToFloat = (value: number) => value / 100
