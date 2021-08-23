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

// TODO remove eslint disable
// eslint-disable-next-line import/prefer-default-export
export class Search {
  static async getDeparturesPoll(origin: string, destination: string, outboundDate: string) {
    const { data } = await bff.get<SearchResponse>(`/api/${origin}/${destination}/${outboundDate}/poll`);

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
}
