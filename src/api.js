import axios from 'axios';
import { busbudApiToken, apiURL } from './config';

const api = axios.create({
  baseURL: apiURL,
  headers: {
    Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': busbudApiToken,
  },
});

const later = (delay) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

export const initializeApiSearch = async (queryParams) => {
  const res = await api({ url: '', params: queryParams });
  return res.data;
};

export const pollApiSearch = async (queryParams) => {
  await later(2000);
  const res = await api({ url: '/poll', params: queryParams });
  return res.data;
};
