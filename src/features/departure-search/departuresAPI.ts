import axios, { AxiosPromise } from 'axios'

export interface DepartureSearchParams {
  origin: string
  destination: string
  outboundDate: string
  adult: number
  poll: boolean
  index: number
}

export function fetchDepartures({
  origin,
  destination,
  outboundDate,
  adult,
  poll = false,
  index = 0,
}: DepartureSearchParams): AxiosPromise {
  const baseUrl = `/x-departures/${origin}/${destination}/${outboundDate}`
  const url = poll
    ? `${baseUrl}/poll?index=${index}`
    : `${baseUrl}?adult=${adult}`

  return axios({
    method: 'get',
    url,
    headers: {
      Accept:
        'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token': process.env.REACT_APP_BUSBUD_TOKEN!,
    },
  })
}
