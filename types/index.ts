export interface ICity {
  id: string,
  name: string
}

export interface ILocation {
  id: string,
  name: string,
  city_id: string
}

export interface IOperator {}

export interface IXDeparture {
  id: string,
  origin_location_id: string,
  destination_location_id: string,
  price: IPrice
  departure_timezone: string,
  arrival_timezone: string,
  departure_time: Date,
  arrival_time: Date
}

export interface IPrice {
  total: number
}