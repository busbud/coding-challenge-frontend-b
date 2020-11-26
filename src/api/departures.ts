import { getApiUrl, getHeaders } from './config';
import { delay } from './delay';

export interface Price {
  currency: string;
  total: number;
}

export interface City {
  id: string;
  name: string;
  timezone: string;
}

export interface Location {
  id: number;
  city_id: string;
  name: string;
  arrival_timezone: string;
  departure_timezone: string;
}
export interface XDeparture {
  id: string;
  origin_location_id: number;
  destination_location_id: number;
  arrival_timezone: string;
  arrival_time: string;
  departure_timezone: string;
  departure_time: string;
  prices: Price;
}

export interface DepartureResponse {
  complete: boolean;
  origin_city_id: string;
  destination_city_id: string;
  cities: City[];
  locations: Location[];
  departures: XDeparture[];
}

export const getDepartures = ({
  origin,
  dest,
  date,
  adult = 0,
  child = 0,
  senior = 0,
  lang = 'en',
  currency = 'USD',
  polling = false,
  pollingIndex = 0,
}: {
  origin: string;
  dest: string;
  date: string;
  adult?: number;
  child?: number;
  senior?: number;
  lang?: string;
  currency?: string;
  polling?: boolean;
  pollingIndex?: number;
}): Promise<DepartureResponse> =>
  fetch(
    `${getApiUrl()}/x-departures/${origin}/${dest}/${date}${
      polling === true ? `/poll?index${pollingIndex}` : '?'
    }adult=${adult}&child=${child}&senior=${senior}&lang=${lang}&currency=${currency}`,
    {
      headers: getHeaders(),
    },
  )
    .then((res) => {
      return res.json() as Promise<DepartureResponse>;
    })
    .then(async (res) => {
      // More data should be fetched
      if (res.complete === false) {
        // waiting 2 seconds
        await delay(2_000);
        debugger;
        // Polling next items
        const poll = await getDepartures({
          origin,
          dest,
          date,
          adult,
          child,
          senior,
          lang,
          currency,
          polling: true,
          pollingIndex: res.departures.length + pollingIndex,
        });

        return {
          ...res,
          cities: [...res.cities, ...poll.cities],
          locations: [...res.locations, ...poll.locations],
          departures: [...res.departures, ...poll.departures],
        };
      }

      // Return all results
      return res;
    });
