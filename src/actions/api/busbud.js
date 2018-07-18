const BUSBUD_TOKEN = process.env.REACT_APP_BUSBUD_TOKEN;

async function getRoutes(origin, destination, outbound_date) {
  const response = await fetch(`https://napi.busbud.com/x-departures/${origin}/${destination}/${outbound_date}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token': BUSBUD_TOKEN,
    },
  });

  if (response.ok) {
    return response.json();
  }
  throw await response.json();
}

async function pollRoutes(origin, destination, outbound_date, offset) {
  const response = await fetch(`https://napi.busbud.com/x-departures/${origin}/${destination}/${outbound_date}/poll?index=${offset}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
      'X-Busbud-Token': BUSBUD_TOKEN,
    },
  });
  if (response.ok) {
    return response.json();
  }
  throw await response.json();
}

export default {
  getRoutes,
  pollRoutes,
};
