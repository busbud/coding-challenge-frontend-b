import {
  Departure,
  DepartureResponse,
  OperatorResponse,
  LocationResponse,
  CityResponse,
} from 'domains/departure';

import { bff } from 'client';

export type SearchResponse = {
  origin_city_id: string
  destination_city_id: string
  cities: CityResponse[]
  locations: LocationResponse[]
  operators: OperatorResponse[]
  departures: DepartureResponse[]
  /** Determines if all departures have been received from all relevant bus companies */
  complete: boolean
  ttl: number
  is_valid_route: boolean
}

export type SearchPollingResponse = {
  cities?: CityResponse[]
  locations?: LocationResponse[]
  operators?: OperatorResponse[]
  departures?: DepartureResponse[]
  /** Determines if all departures have been received from all relevant bus companies */
  complete: boolean
  ttl: number
}

export class Search {
  static async getDeparturesPoll(
    origin: string,
    destination: string,
    outboundDate: string,
    adults: string,
    index: number,
  ) {
    const { data } = await bff.get<
      SearchResponse
    >(`/api/${origin}/${destination}/${outboundDate}/poll?adult=${adults}&index=${index}`);

    return data;
  }

  static fromApi(rawSearch: SearchResponse) {
    const departures = rawSearch.departures.map((departure) => (
      Departure.fromApi(departure, rawSearch.cities, rawSearch.locations, rawSearch.operators)
    ));

    return new Search(
      departures,
      rawSearch.complete,
    );
  }

  constructor(
    public departures: Departure[],
    public complete: boolean,
  ) {
    this.departures = departures;
    this.complete = complete;
  }

  static withAddedPolling(
    searchResponse: SearchResponse,
    searchPollingResponse: SearchPollingResponse,
  ): SearchResponse {
    const cities = searchResponse.cities.concat(searchPollingResponse.cities || []);
    const locations = searchResponse.locations.concat(searchPollingResponse.locations || []);
    const operators = searchResponse.operators.concat(searchPollingResponse.operators || []);
    const departures = searchResponse.departures.concat(searchPollingResponse.departures || []);
    const { complete } = searchPollingResponse;

    return {
      ...searchResponse,
      cities,
      locations,
      operators,
      departures,
      complete,
    };
  }
}
