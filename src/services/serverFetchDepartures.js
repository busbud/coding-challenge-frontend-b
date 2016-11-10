// server fetch to API
import qs from 'qs';

import fetch from './fetch';

const endpoint = 'https://napi.busbud.com/x-departures/:origin/:destination/:outboundDate';

const applyParameters = (baseUrl, pathParams, queryParams) => (
  Object.keys(pathParams).reduce((memo, param) => (
    memo.replace(`:${param}`, pathParams[param])
  ), baseUrl) + '?' + qs.stringify(queryParams)
);

const headers = () => ({
  'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': process.env.BUSBUD_TOKEN,
});

const fetchDepartures = (pathParams, queryParams) => fetch(
  applyParameters(endpoint, pathParams, queryParams),
  { headers: headers() }
).then(res => res.json());

module.exports = fetchDepartures;
