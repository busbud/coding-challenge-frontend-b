const BUSBUD_TOKEN = process.env.REACT_APP_BUSBUD_TOKEN;

function getRoutes(origin, destination, outbound_date) {
  return fetch(`https://napi.busbud.com/x-departures/${origin}/${destination}/${outbound_date}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token': BUSBUD_TOKEN,
    },
  }).then(response => (response.json()));
}

function pollRoutes(origin, destination, outbound_date, offset) {
  return fetch(`https://napi.busbud.com/x-departures/${origin}/${destination}/${outbound_date}/poll?index=${offset}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token': BUSBUD_TOKEN,
    },
  }).then(response => (response.json()));
}

export default {
  getRoutes,
  pollRoutes,
};
