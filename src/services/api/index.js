import axios from 'axios';
import { concat, cond, T, equals, converge, compose, prop, always } from 'ramda';
import { BASE_URL, ACCEPT } from './constants';

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Accept'] = ACCEPT;
axios.defaults.headers.common['X-Busbud-Token'] = process.env.REACT_APP_BUSBUD_TOKEN;

const complete = prop('complete');

export const pollWhenNotComplete = compose(cond([[equals(false), always('/poll')], [T, always('')]]), complete);

export const addPathParametersToURL = ({ origin, destination, outbound_date }) =>
  `x-departures/${origin}/${destination}/${outbound_date}`;

export const generateXDeparturesURL = converge(concat, [addPathParametersToURL, pollWhenNotComplete]);

export const fetchXDepartures = (path, params, complete) => {
  const url = generateXDeparturesURL({ ...path, complete });

  return request(url, params);
};

export const request = (url, params = {}) => axios.get(url, { params });
