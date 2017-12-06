import axios from 'axios';
import moment from 'moment';

const apiHost = 'https://napi.busbud.com';

const headers = {
  Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': process.env.REACT_APP_API_TOKEN,
};

function get(url) {
  return axios(url, {
    method: 'GET',
    mode: 'development' === process.env.NODE_ENV ? 'no-cors' : '',
    headers,
  }).then(resp => resp.data);
}

function buildBaseUrl(origin, destination, date) {
  return `${apiHost}/x-departures/${origin}/${destination}/${moment(date).format('YYYY-MM-DD')}`;
}

export function initialFetch({ origin, destination, date }) {
  const url = `${buildBaseUrl(origin, destination, date)}`;
  return get(url);
}

export function poll({ origin, destination, date, index }) {
  const url = `${buildBaseUrl(origin, destination, date)}/poll?index=${index}`;
  return get(url);
}
