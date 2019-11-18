import axios from 'axios';

export interface LoadDataParams {
  origin: string;
  destination: string;
  date: string;
  adult?: number;
  child?: number;
  senior?: number;
  lang?: string;
  currency?: string;
}

export default (params: LoadDataParams) => {
  const {
    origin,
    destination,
    date,
    adult = 1,
    child = 0,
    senior = 0,
    lang = 'en',
    currency = 'USD'
  } = params;

  return axios({
    method: 'GET',
    url: `https://napi.busbud.com/x-departures/${origin}/${destination}/${date}`,
    headers: {
      Accept:
        'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token': 'PARTNER_AHm3M6clSAOoyJg4KyCg7w'
    },
    params: {
      adult,
      child,
      senior,
      lang,
      currency
    }
  }).then(res => {
    return res.data;
  });
};
