import axios, { AxiosInstance } from 'axios';

export class Search {
  static ssrClient: AxiosInstance;

  static initSsrClient(): void {
    Search.ssrClient = axios.create({
      baseURL: process.env.API_URL,
      headers: {
        Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
        'X-Busbud-Token': process.env.API_TOKEN
      },
    });
  }

  static async getSSRDeparture(origin: string, destination: string, outbound_date: string) {
    if (!Search.ssrClient) { // TODO another way instead of init?
      Search.initSsrClient();
    }

    const data = await Search.ssrClient.get<{}>(`/x-departures/${origin}/${destination}/${outbound_date}`, {});

    return data;
  }
}
