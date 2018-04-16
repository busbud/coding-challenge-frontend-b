import { format, differenceInCalendarDays } from 'date-fns';
import { Cities } from "./types/cities";
import { Operators } from "./types/operators";
import { Departures, DeparturesResponse } from "./types/departures";
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


interface SearchResponse {
  cities: Cities[],
  complete: boolean,
  departures: DeparturesResponse[],
  operators: Operators[],
  locations: Locations[]
  destination_city_id: String,
  is_valid_route: boolean,
  origin_city_id: String,
}

const endpoint = 'https://napi.busbud.com/x-departures';
const buildQuery = (
  outboundDate: string, 
  passangerNumber: number | undefined,
  origin = "dr5reg" as string,
  destination = "f25dvk" as string, 
) => `${endpoint}/${origin}/${destination}/${outboundDate}${passangerNumber ? `?adult=${passangerNumber}`: ''}`;


const headers = {
  Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
};

export const fetchSearch = (outboundDate: string, passangerNumber?: number): Promise<SearchResponse> => fetch(
  buildQuery(outboundDate, passangerNumber),
  { headers },
).then(res => res.json()) 


export const adaptResponse = (results: SearchResponse): SearchResults => {
  return ({
    ...results,
    departures: results.departures.map(departure => {
      const hours = departure.duration / 60;
      const minutes = Math.round((hours - Math.floor(hours)) * 60);
      const daysDifference = differenceInCalendarDays(departure.arrival_time, departure.departure_time);

      return {
        ...departure,
        daysDifference,
        arrival_time: format(departure.arrival_time, 'h:mm a'),
        departure_time: format(departure.departure_time, 'h:mm a'),
        totalPrice: (departure.prices.total / 100),
        duration: `${Math.round(hours)}h ${minutes}min`,
      };
    })
  })
}