import axios from 'axios';
import { busbudApi, token } from './../constants';

export const getTickets = (
  origin: string,
  destination: string,
  outboundDate: string,
  adult?: number,
  child?: number,
  senior?: number,
  lang?: string,
  currency?: string
) => {
  const headers = {
    'X-Busbud-Token': token
  };
  return axios.get(`${busbudApi}/${origin}/${destination}/${outboundDate}`, {
    params: {
      adult,
      child,
      senior,
      lang,
      currency
    },
    headers
  });
};
