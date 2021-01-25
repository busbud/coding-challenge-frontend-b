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
      lang,
      currency,
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
