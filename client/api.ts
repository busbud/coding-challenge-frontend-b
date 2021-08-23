import axios from 'axios';

import { serverRuntimeConfig } from 'configs/envs';

export const api = axios.create({
  baseURL: serverRuntimeConfig.API_URL,
  headers: {
    Accept: 'application/vnd.busbud+json version=2 profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': serverRuntimeConfig.API_TOKEN,
  },
});
