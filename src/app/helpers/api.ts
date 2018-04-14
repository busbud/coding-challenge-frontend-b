import { Cities } from "./cities";
import { Operators } from "./operators";
import { Departures } from "./departures";
import { Locations } from "./locations";



export interface SearchResponse {
  cities: Cities[],
  complete: boolean,
  departures: Departures[],
  operators: Operators[],
  locations: Locations[]
  destination_city_id: String,
  is_valid_route: boolean,
  origin_city_id: String,
}

const endpoint = 'https://napi.busbud.com/x-departures';
const buildQuery = (
  origin = "dr5reg" as string,
  destination = "f25dvk" as string, 
  outboundDate = "2018-08-02" as string, 
) => `${endpoint}/${origin}/${destination}/${outboundDate}`;


const headers = {
  Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
};

export const fetchSearch = (): Promise<SearchResponse> => fetch(
  buildQuery(),
  { headers },
).then(res => res.json()) 


export const adaptResponse = (results: SearchResponse) => {
  return ({
    ...results,
    departures: results.departures.map(departure => ({
      ...departure,
      arrival_time: new Date(departure.arrival_time).getHours(),
      departure_time: new Date(departure.departure_time).getHours(),
      totalPrice: (departure.prices.total / 100),
      duration: departure.duration / 60 ,
    }))
  })
}