import { CurrencyDomain } from '../../../domain/currency'
import { LanguageDomain } from '../../../domain/language'
import { LocationDomain } from '../../../domain/location'
import { OperatorDomain } from '../../../domain/operator'
import { DeparturesDomain, SearchDomain } from '../../../domain/search'

export const citiesFactory = [
  {
    id: '1',
    name: 'Quebec',
    geohash: 'temp',
  },
  {
    id: '2',
    name: 'Montreal',
    geohash: 'temp',
  },
]

export const locationsFactory: LocationDomain.Location[] = [
  {
    id: 1,
    city_id: '1',
    name: 'Quebec Station',
    geohash: 'quebecstation',
  },
  {
    id: 2,
    city_id: '2',
    name: 'Montreal Station',
    geohash: 'montrealstation',
  },
]

export const operatorsFactory: OperatorDomain.Operator[] = [
  {
    id: '1',
    name: 'Operator One',
    display_name: 'Display Operator One',
    logo_url: 'logo_one.png',
  },
  {
    id: '2',
    name: 'Operator Two',
    display_name: 'Display Operator Two',
    logo_url: 'logo_Two.png',
  },
]

export const departuresFactory = [
  {
    id: '1',
    operator_id: '1',
    origin_location_id: 1,
    destination_location_id: 2,
    departure_timezone: 'UTC',
    arrival_timezone: 'UTC',
    departure_time: new Date('2022-01-28 03:00:00'),
    arrival_time: new Date('2022-01-28 06:00:00'),
    prices: {
      total: 5000,
    },
    trip_stops: [{}, {}],
  },
]

export const searchDepartures = (props?: any) => {
  return {
    origin_city_id: citiesFactory[0],
    destination_city_id: citiesFactory[1],
    cities: citiesFactory,
    locations: locationsFactory,
    operators: operatorsFactory,
    departures: departuresFactory,
    complete: true,
    status: DeparturesDomain.COMPLETE,
    ...props,
  }
}

export const responseToListFactory = [
  {
    arrival_time_zoned: '06:00 AM',
    departure_time_zoned: '03:00 AM',
    destination_city_name: 'Montreal',
    destination_location_name: 'Montreal Station',
    id: '1',
    operator: {
      display_name: 'Display Operator One',
      id: '1',
      logo_url: 'logo_one.png',
      name: 'Operator One',
    },
    origin_city_name: 'Quebec',
    origin_location_name: 'Quebec Station',
    price_total: 5000,
    stops_count: 2,
    travel_time: '3 hours',
  },
]

export const searchDomainClassFactory: SearchDomain.SearchData = {
  origin: citiesFactory[0],
  destination: citiesFactory[1],
  outboundDate: new Date('2022-01-28 03:00:00').toISOString(),
  adult: 1,
  child: 1,
  senior: 2,
  senior_ages: ['67', '65'],
  child_ages: ['9'],
  lang: LanguageDomain.EN,
  currency: CurrencyDomain.USD,
}
