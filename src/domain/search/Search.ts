import { LocationDomain } from '../location'
import { LanguageDomain } from '../language'
import { CurrencyDomain } from '../currency'
export interface SearchData {
  origin: LocationDomain.Location
  destination: LocationDomain.Location
  outboundDate: string
  adult: number
  child: number
  senior: number
  senior_ages: string[]
  child_ages: string[]
  lang: LanguageDomain.Language
  currency: CurrencyDomain.Currency
}

export interface PathParams {
  origin: LocationDomain.Location['geohash']
  destination: LocationDomain.Location['geohash']
  outbound_date: string
}

export interface QueryParams {
  adult: number
  child: number
  senior: number
  senior_ages: string
  child_ages: string
  lang: LanguageDomain.Language
  currency: CurrencyDomain.Currency
}

export const CHILD = 'child'
export const ADULT = 'adult'
export const SENIOR = 'senior'
export const SENIOR_AGES = 'senior_ages'
export const CHILD_AGES = 'child_ages'

export type PassengerKeys = typeof CHILD | typeof ADULT | typeof SENIOR
export type PassengerAgeKeys = typeof CHILD_AGES | typeof SENIOR_AGES

export const hasMaxPassengers = (count: number) => {
  return count === 5
}

export class Search {
  private _path: PathParams
  private _query: QueryParams

  constructor({
    origin,
    destination,
    outboundDate,
    adult,
    child,
    senior,
    senior_ages,
    child_ages,
    lang,
    currency,
  }: SearchData) {
    this._path = {
      origin: origin.geohash,
      destination: destination.geohash,
      outbound_date: new Date(outboundDate).toISOString().split('T')[0],
    }
    this._query = {
      adult,
      child,
      senior,
      senior_ages: senior_ages.map((age) => parseInt(age)).join(','),
      child_ages: child_ages.join(','),
      lang,
      currency,
    }
  }

  static start(data: SearchData) {
    const search = new Search(data)
    return search
  }

  urlParams() {
    const { origin, destination, outbound_date } = this._path
    return `${origin}/${destination}/${outbound_date}`
  }

  queryParams() {
    return this._query
  }
}
