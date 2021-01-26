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
  lang: LanguageDomain.Language
  currency: CurrencyDomain.Currency
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
