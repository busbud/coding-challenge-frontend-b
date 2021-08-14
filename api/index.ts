import { Departure, Location } from '../types'

const BUSBUD_TOKEN = 'PARTNER_c9g6z7V0SNqUlnar2EFsxw'

const get = (
  url: string,
  params?: Record<string, any>,
  headers: Record<string, string> = {}
) => {
  const _url = new URL(url)
  if (params) _url.search = new URLSearchParams(params).toString()
  return fetch(_url.toString(), {
    method: 'GET',
    headers
  }).then(res => res.json())
}

export type ExtraDepartureParameters = Partial<{
  adult: number
  child: number
  senior: number
  lang: 'en' | 'fr' | 'es' | string
  currency: 'CAD' | 'USD' | 'EUR' | string
}>

type DeparturesResponse = {
  locations: Location[]
  departures: Departure[]
  complete: boolean
}

export const getDepartures = (
  origin: string,
  destination: string,
  outboundDate: string,
  extraParameters: ExtraDepartureParameters = {},
  index?: number
) =>
  get(
    `https://napi.busbud.com/x-departures/${origin}/${destination}/${outboundDate}`,
    { ...extraParameters, ...(index ? { index } : {}) },
    {
      Accept:
        'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token': BUSBUD_TOKEN
    }
  ) as Promise<DeparturesResponse>
