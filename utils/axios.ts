import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const createAxiosInstance = (
  config: AxiosRequestConfig = {}
): AxiosInstance =>
  axios.create(config);

export default createAxiosInstance({
  baseURL: process.env.BASE_API,
  headers: {
    Accept:
      'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': 'PARTNER_BaASYYHxTxuOINEOMWq5GA',
  },
});
