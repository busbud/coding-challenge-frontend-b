import axios from 'axios';
import { getCurrentLanguage } from '../services/attribute-service';

async function getHeader() {
  let token = process.env.X_BUSBUD_TOKEN;
  if (!token) {
    const response = await axios.get('/cred');
    token = response.data.cred;
  }
  return {
    Accept:
      'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': `${token}`,
  };
}

const language = getCurrentLanguage();
const { currency } = window.localStorage;

function generateUrl(index, searchDay) {
  return `https://napi.busbud.com/x-departures/dr5reg/f25dvk/${searchDay}/poll?index=${index}&lang=${language}&currency=${currency}`;
}

export async function fetchDepartures(index, searchDay) {
  const response = await axios({
    method: 'get',
    url: generateUrl(index, searchDay),
    headers: await getHeader(),
  });
  return response.data;
}
