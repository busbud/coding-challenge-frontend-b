import { Location } from '../location/Location'
import { Language } from '../language/Language'
import { Currency } from '../currency/Currency'

export interface SearchData {
  readonly origin: Location
  readonly destination: Location
  readonly outboundDate: string
  readonly adult: number
  readonly child: number
  readonly senior: number
  readonly lang: Language
  readonly currency: Currency
}

export interface PathParams {
  origin: Location['geohash']
  destination: Location['geohash']
  outbound_date: string
}

export interface QueryParams {
  adult: number
  child: number
  senior: number
  lang: Language['code']
  currency: Currency['code']
}

export enum SearchStatus {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  INCOMPLETE = 'INCOMPLETE',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export class Search {
  private _path: PathParams
  private _query: QueryParams
  private _status: SearchStatus

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
      outbound_date: new Date(outboundDate).toISOString(),
    }
    this._query = {
      adult,
      child,
      senior,
      lang: lang.code,
      currency: currency.code,
    }
    this._status = SearchStatus.INITIAL
  }

  static start(data: SearchData) {
    const search = new Search(data)
    search.markAsLoading()

    return search
  }

  get params() {
    return {
      path: this._path,
      query: this._query,
      status: SearchStatus.COMPLETED,
    }
  }

  markAsLoading() {
    this._status = SearchStatus.LOADING
  }

  markAsIncomplete() {
    this._status = SearchStatus.INCOMPLETE
  }

  markAsCompleted() {
    this._status = SearchStatus.COMPLETED
  }
}
