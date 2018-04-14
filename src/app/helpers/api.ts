import { LocalTime } from 'js-joda';
import { Cities } from "./types/cities";
import { Operators } from "./types/operators";
import { Departures } from "./types/departures";
import { Locations } from "./types/locations";


export interface SearchResults {
  cities: Cities[],
  complete: boolean,
  departures: Departures[],
  operators: Operators[],
  locations: Locations[]
  destination_city_id: String,
  is_valid_route: boolean,
  origin_city_id: String,
}


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
    departures: results.departures.map(departure => {
      const arrivalTime = new Date(departure.arrival_time as any);
      const departureTime = new Date(departure.departure_time as any);

      const hours = departure.duration / 60;
      const minites = Math.round((hours - Math.floor(hours)) * 60);

      return {
      ...departure,
      arrival_time: `${arrivalTime.getHours()}:${arrivalTime.getMinutes()}`,
      departure_time: `${departureTime.getHours()}:${departureTime.getMinutes()}`,
      totalPrice: (departure.prices.total / 100),
      duration: `${Math.round(hours)}h ${minites}min`,
    };
    })
  })
}