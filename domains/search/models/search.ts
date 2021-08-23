import axios, { AxiosInstance } from 'axios';

import { City, CityResponse } from 'domains/city';
import { Location, LocationResponse } from 'domains/location';
import { Operator, OperatorResponse } from 'domains/operator';
import { Departure, DepartureResponse } from 'domains/departure';

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
  static client: AxiosInstance

  static ssrClient: AxiosInstance

  static initClient(): void {
    Search.client = axios.create({
      baseURL: '/',
    });
  }

  static initSsrClient(): void {
    Search.ssrClient = axios.create({
      baseURL: process.env.API_URL,
      headers: {
        Accept: 'application/vnd.busbud+json version=2 profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': process.env.API_TOKEN,
      },
    });
  }

  static async getSSRDepartures(origin: string, destination: string, outboundDate: string) {
    if (!Search.ssrClient) {
      Search.initSsrClient();
    }

    const { data } = await Search.ssrClient.get<{
      data: { data: SearchResponse }
    }>(`/x-departures/${origin}/${destination}/${outboundDate}`);

    return data;
  }

  static async getSSRDeparturesPoll(origin: string, destination: string, outboundDate: string) {
    if (!Search.ssrClient) {
      Search.initSsrClient();
    }

    const { data } = await Search.ssrClient.get<{
      data: { data: SearchResponse }
    }>(`/x-departures/${origin}/${destination}/${outboundDate}/poll`);

    return data;
  }

  static async getDeparturesPoll(origin: string, destination: string, outboundDate: string) {
    if (!Search.client) {
      Search.initClient();
    }

    const { data } = await Search.client.get<SearchResponse>(`/api/${origin}/${destination}/${outboundDate}/poll`);

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
