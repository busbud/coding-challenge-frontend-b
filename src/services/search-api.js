import axios from 'axios';
import { getCurrentLng } from './i18n';

const headers = {
  Accept:
    'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': process.env.REACT_APP_BUSBUD_TOKEN
};

export class SearchApi {
  static _generateBaseUrl(origin, destination, date) {
    return `https://napi.busbud.com/x-departures/${origin}/${destination}/${date}`;
  }

  static _generateParams(params) {
    const defaultParams = { lang: getCurrentLng() };
    params = { ...defaultParams, ...params };

    return Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');
  }

  static initiate({ origin, destination, date, nbAdults, cancelToken }) {
    const baseUrl = this._generateBaseUrl(origin, destination, date);
    const stringParams = this._generateParams({ adult: nbAdults });

    return this._get(baseUrl, stringParams, cancelToken);
  }

  static poll({ origin, destination, date, nbAdults, offset, cancelToken }) {
    const baseUrl = this._generateBaseUrl(origin, destination, date) + '/poll';
    const stringParams = this._generateParams({
      adult: nbAdults,
      index: offset
    });

    return this._get(baseUrl, stringParams, cancelToken);
  }

  static _get(baseUrl, stringParams, cancelToken) {
    return axios
      .get(`${baseUrl}?${stringParams}`, {
        headers,
        cancelToken
      })
      .then(this._formatResponse);
  }

  static _formatResponse = response => {
    const _generateHashTable = entities => {
      return (entities || []).reduce((acc, entity) => {
        acc[entity.id] = entity;
        return acc;
      }, {});
    };

    const { data } = response;
    if (!data || !data.departures) {
      return response;
    }

    const operators = _generateHashTable(data.operators);
    const locations = _generateHashTable(data.locations);
    const cities = _generateHashTable(data.cities);
    const _formatLocation = ({ name, address, lat, lon }) => ({
      name,
      address,
      lat,
      lng: lon
    });

    const formattedData = data.departures.map(departure => {
      const operator = operators[departure.operator_id];
      const depLoc = locations[departure.origin_location_id];
      const depCity = cities[depLoc.city_id] || {};
      const destiLoc = locations[departure.destination_location_id];
      const destiCity = cities[destiLoc.city_id] || {};

      return {
        id: departure.id,
        operator,
        departure: {
          city: depCity.name,
          date: departure.departure_time,
          location: _formatLocation(depLoc)
        },
        arrival: {
          city: destiCity.name,
          date: departure.arrival_time,
          location: _formatLocation(destiLoc)
        },
        price: departure.prices.total / 100
      };
    });

    // Add the formatted data to the original data in the response
    return { ...response, data: { ...data, formattedData } };
  };
}
