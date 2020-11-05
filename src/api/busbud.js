import config from '../config';

const API = config.APIs.busbud.api;
const headerToken = config.APIs.busbud['X-Busbud-Token'];
const defaultDestination = config.destinationCity.geohash;
const defaultOrigin = config.originCity.geohash;
const defaultDate = config.defaultSearchDate;

export function fetchTickets(
  origin = defaultOrigin,
  destination = defaultDestination,
  outBoundDate = defaultDate,
  adult = 1,
  child = 0,
  senior = 0,
  lang = 'en',
  currency = 'CAD'
) {
  return fetch(`${API}/${origin}/${destination}/${outBoundDate}?adult=${adult}&child=${child}&senior=${senior}&lang=${lang}&currency=${currency}`,
    {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'X-Busbud-Token': headerToken,
        Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      },
      referrerPolicy: 'no-referrer',
    });
}

export default null;
