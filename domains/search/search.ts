import axios, { AxiosInstance } from 'axios';

// import { Category, CategoryResponse } from './category';
// import { Item } from './item';

// export type CatalogResponse = CategoryResponse[];

// TODO remove eslint disable
// eslint-disable-next-line import/prefer-default-export
export class Search {
  static client: AxiosInstance;

  static ssrClient: AxiosInstance;

  static initClient(): void {
    Search.client = axios.create({
      baseURL: '/',
    });
  }

  static initSsrClient(): void {
    Search.ssrClient = axios.create({
      baseURL: process.env.API_URL,
      headers: {
        Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': process.env.API_TOKEN,
      },
    });
  }

  static async getSSRDepartures(origin: string, destination: string, outboundDate: string) {
    if (!Search.ssrClient) { // TODO another way instead of init?
      Search.initSsrClient();
    }

    const data = await Search.ssrClient.get(`/x-departures/${origin}/${destination}/${outboundDate}`, {
    });

    return data;
  }

  static async getSSRDeparturesPoll(origin: string, destination: string, outboundDate: string) {
    if (!Search.ssrClient) { // TODO another way instead of init?
      Search.initSsrClient();
    }

    const data = await Search.ssrClient.get(`/x-departures/${origin}/${destination}/${outboundDate}/poll`);

    return data;
  }

  static async getDeparturesPoll(origin: string, destination: string, outboundDate: string) {
    if (!Search.client) { // TODO another way instead of init?
      Search.initClient();
    }

    const data = await Search.client.get(`/api/${origin}/${destination}/${outboundDate}/poll`);

    return data.data;
  }
}
