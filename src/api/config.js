import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2018-08-02',
  timeout: 200,
  headers: {
    'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
  }
});