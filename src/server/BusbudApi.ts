import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { DepartureSearchInitResult, DepartureSearchPollResult }
  from '../api/busbud/DepartureSearch';

/**
 * Wrapper for the Busbud api
 */
class BusbudApi {
  readonly request: AxiosInstance;

  constructor(token: string) {
    this.request = axios.create({
      baseURL: 'https://napi.busbud.com/',
      headers: {
        'Accept': [
          'application/vnd.busbud+json',
          'version=2',
          'profile=https://schema.busbud.com/v2/'
        ].join('; '),
        'X-Busbud-Token': token
      }
    });
  }

  departureSearchInit(
    origin: string,
    destination: string,
    outboundDate: string,
    params: object
  ): Promise<AxiosResponse<DepartureSearchInitResult>> {
    return this.request.get(
      `x-departures/${origin}/${destination}/${outboundDate}`,
      { params }
    );
  }

  departureSearchPoll(
    origin: string,
    destination: string,
    outboundDate: string,
    params: object
  ): Promise<AxiosResponse<DepartureSearchPollResult>> {
    return this.request.get(
      `x-departures/${origin}/${destination}/${outboundDate}/poll`,
      { params }
    );
  }
}

export default BusbudApi;
