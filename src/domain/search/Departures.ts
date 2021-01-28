import { formatDistanceStrict, parseISO } from 'date-fns'
import { format } from 'date-fns-tz'
import { CityDomain } from '../city'
import { DepartureDomain } from '../departure'
import { LocationDomain } from '../location'
import { OperatorDomain } from '../operator'

export type Departures = {
  origin_city_id: string
  destination_city_id: string
  cities: CityDomain.City[]
  locations: LocationDomain.Location[]
  operators: OperatorDomain.Operator[]
  departures: DepartureDomain.Departure[]
  complete: boolean
  status?: DeparturesStatus
}

export const NOT_INITIALIZED = 'NOT_INITIALIZED'
export const PENDING = 'PENDING'
export const INCOMPLETE = 'INCOMPLETE'
export const COMPLETE = 'COMPLETE'
export const REJECTED = 'REJECTED'

export type DeparturesStatus =
  | typeof NOT_INITIALIZED
  | typeof PENDING
  | typeof INCOMPLETE
  | typeof COMPLETE
  | typeof REJECTED

export const setCompleteOrIncomplete = (status: boolean) => {
  return status ? COMPLETE : INCOMPLETE
}

export type DeparturesList = {
  id: string
  origin_city_name: string
  origin_location_name: string
  destination_city_name: string
  destination_location_name: string
  operator: OperatorDomain.Operator
  price_total: DepartureDomain.Prices['total']
  stops_count: number
  travel_time: string
  arrival_time_zoned: string
  departure_time_zoned: string
}

type DeparturesListInput = {
  cities: Departures['cities']
  locations: Departures['locations']
  operators: Departures['operators']
  departures: Departures['departures']
}
export const responseToList = ({
  cities,
  locations,
  operators,
  departures,
}: DeparturesListInput): DeparturesList[] => {
  return departures.map((departure) => {
    const departureOriginLocation = LocationDomain.getLocationById(
      locations,
      departure.origin_location_id
    )
    const departureOriginCity = CityDomain.getCityById(
      departureOriginLocation.city_id,
      cities
    )

    const departureDestinationLocation = LocationDomain.getLocationById(
      locations,
      departure.destination_location_id
    )
    const departureDestinationCity = CityDomain.getCityById(
      departureDestinationLocation.city_id,
      cities
    )

    const operator = OperatorDomain.getOperatorById(
      operators,
      departure.operator_id
    )

    const departureTime = new Date(departure.departure_time)
    const arrivalTime = new Date(departure.arrival_time)
    return {
      id: departure.id,
      origin_location_name: departureOriginLocation.name,
      origin_city_name: departureOriginCity.name,
      destination_city_name: departureDestinationCity.name,
      destination_location_name: departureDestinationLocation.name,
      operator,
      price_total: departure.prices.total,
      stops_count: departure.trip_stops.length,
      travel_time: calculateTravelTime(departureTime, arrivalTime),
      departure_time_zoned: format(departureTime, 'hh:mm aaa', {
        timeZone: departure.departure_timezone,
      }),
      arrival_time_zoned: format(arrivalTime, 'hh:mm aaa', {
        timeZone: departure.arrival_timezone,
      }),
    }
  })
}

export const calculateTravelTime = (departure: Date, arrival: Date) => {
  return formatDistanceStrict(departure, arrival)
}
