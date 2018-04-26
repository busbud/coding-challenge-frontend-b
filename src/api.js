import axios from 'axios';
import { busbudApiToken, apiURL } from './config';

const api = axios.create({
  baseURL: apiURL,
  headers: {
    Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': busbudApiToken,
  },
});

export const initializeApiSearch = (queryParams) => {
  return api({ url: '', params: queryParams });
};

export const pollApiSearch = (queryParams) => {
  return api({ url: '/poll', params: queryParams });
};
