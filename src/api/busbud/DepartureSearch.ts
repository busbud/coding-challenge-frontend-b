import { City } from "./City"
import { Location } from "./Location"
import { Operator } from "./Operator"
import { XDeparture } from "./XDeparture"

export interface DepartureSearchInitResult {
  origin_city_id: string,
  destination_city_id: string,
  cities: City[],
  locations: Location[],
  operators: Operator[],
  departures: XDeparture[],
  complete: boolean,
  ttl: number,
  is_valid_route: boolean
}

export interface DepartureSearchPollResult {
  operators: Operator[],
  departures: XDeparture[],
  complete: boolean,
  ttl: number
}
