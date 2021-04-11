import { ICity, ILocation, IXDeparture } from '../types'

const BASE_URL = 'https://napi.busbud.com'

const HEADERS = {
  'X-Busbud-Token': process.env['X-BUSBUD-TOKEN']
}

interface IGetXDeparturesURLParams {
  origin: string,
  destination: string,
  outboundDate: string
}

interface IGetXDeparturesQueryParams {
  adult?: string,
  child?: string,
  senior?: string,
  lang?: 'en' | 'fr' | 'es',
  currency?: 'CAD' | 'USD' | 'EUR'
}

interface IGetXDeparturesPollQueryParams extends IGetXDeparturesQueryParams {
  index: string
}

interface IGetXDeparturesPollResponse {
  locations: ILocation[],
  departures: IXDeparture[],
  complete: boolean
}

interface IGetXDeparturesResponse extends IGetXDeparturesPollResponse {
  cities: ICity[],
}

export function generateURL(urlPath: string, queryParams: { [key: string]: string } ): string {
  const url = new URL(urlPath)
  url.search = new URLSearchParams(queryParams).toString()

  return url.toString()
}

export async function GET<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url, { headers: HEADERS })
    return await response.json()
  } catch(error) {
    console.error(error)
  }
}

export async function getXDepartures(
  { origin, destination, outboundDate }: IGetXDeparturesURLParams ,
  { adult = '1', child = '0', senior = '0', lang = 'en', currency = 'CAD' }: IGetXDeparturesQueryParams = {}
): Promise<IGetXDeparturesResponse> {
  const urlPath = `${BASE_URL}/x-departures/${origin}/${destination}/${outboundDate}`
  const queryParams = { adult, child, senior, lang, currency }

  return await GET<IGetXDeparturesResponse>(generateURL(urlPath, queryParams))
}

export async function getXDeparturesPoll(
  { origin, destination, outboundDate }: IGetXDeparturesURLParams,
  { adult = '1', child = '0', senior = '0', lang = 'en', currency = 'CAD', index }: IGetXDeparturesPollQueryParams
): Promise<IGetXDeparturesPollResponse> {
  const urlPath = `${BASE_URL}/x-departures/${origin}/${destination}/${outboundDate}/poll`
  const queryParams = { adult, child, senior, lang, currency, index }

  return await GET<IGetXDeparturesPollResponse>(generateURL(urlPath, queryParams))
}
