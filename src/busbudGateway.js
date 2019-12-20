import axios from 'axios';

export default axios.create({
  baseURL: 'https://napi.busbud.com/x-departures/',
  headers: {
    Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': process.env.VUE_APP_BUSBUD_API_TOKEN,
  },
});
