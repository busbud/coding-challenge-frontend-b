import axios from 'axios';
import { getCurrentLanguage } from '../services/attribute-service';

const URL =
  'https://napi.busbud.com/x-departures/dr5reg/f25dvk/2019-08-02/poll';

const headers = {
  Accept:
    'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': `${process.env.X_BUSBUD_TOKEN}`,
};

const language = getCurrentLanguage();
const { currency } = window.localStorage;

export async function fetchDepartures(index, n = 2) {
  try {
    const response = await axios({
      method: 'get',
      url: `${URL}?index=${index}&lang=${language}&currency=${currency}`,
      headers,
    });
    return response.data;
  } catch (err) {
    if (n === 1) {
      throw err;
    }
    return await fetchDepartures(index, n - 1);
  }
}
