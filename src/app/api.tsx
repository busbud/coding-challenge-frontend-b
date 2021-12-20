/**
 * Similar to typing, using just one file...but this could be split on business logic or any other criteria
 * that helps to reduce complexity.
 * 
 * # SIDENOTE
 * Maybe I should create a server repository to hide tokens...
 * But I think it's overkill for this challenge.
 * That middleware would interact with this API,
 * and this file would interact with it instead of doing it directly to the services.
 * 
 * Imagine all of that *just* happens.
 */
import fetch from "isomorphic-fetch";
import { RequestDeparture, ResponseSearch } from 'types';

// In happier non-rush challenge world, this wouldn't be here. Unsure where I would put it, though.
// Probably would move it around like 500 times until someone says there is a standard (lies) for this
const baseUrl = 'https://napi.busbud.com/x-departures';
const headers = {
  'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': 'PARTNER_c9g6z7V0SNqUlnar2EFsxw'
};

interface IOptions {
  headers?: any;
  body?: any;
  method?: string;
}

const API = {
  search: async ({
    origin,
    destination,
    outbound_date,
    index,
    filters
  }: RequestDeparture): Promise<ResponseSearch | null> => {
    let url = `${baseUrl}/${origin}/${destination}/${outbound_date}`;
    if (filters) {
      // Probably not the safest/best way.
      const { adult, child, senior, lang, currency } = filters;
      url += `?adult=${adult}&child=${child}&senior=${senior}&lang=${lang}&currency=${currency}`;
      if (index) {
        url += `&index=${index}`;
      }
    }
    const options: IOptions = {
      headers,
    };

    try {
      const response = await fetch(url, options);
      // No response
      const contentLength = response.headers.get("content-length");
      const length = Number(contentLength);
      if (!response.ok || (contentLength && length === 0 && response.ok) || response.status === 204) {
        return null;
      }
      const parsed = await response.json();
      return parsed as ResponseSearch;
    } catch (error) {
      console.info('An error ocurred when requesting the data');
      throw error;
    }
  }
};

export default API;
 