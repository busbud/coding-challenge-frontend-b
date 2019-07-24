import axios from 'axios';
import { getCurrentLanguage } from '../services/attribute-service';

const headers = {
  Accept:
    'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': `${process.env.X_BUSBUD_TOKEN}`,
};

const language = getCurrentLanguage();
const { currency } = window.localStorage;

function generateUrl(index, searchDay) {
  return `https://napi.busbud.com/x-departures/dr5reg/f25dvk/${searchDay}/poll?index=${index}&lang=${language}&currency=${currency}`;
}

export async function fetchDepartures(index, searchDay) {
  const response = await axios({
    method: 'get',
    url: generateUrl(index, searchDay),
    headers,
  });
  return response.data;
}
