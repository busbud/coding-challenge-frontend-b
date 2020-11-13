export const params = {
  origin: 'f2m673',
  destination: 'f25dvk',
  outbound_date: '2020-12-25',
};

export const baseUrl = `https://napi.busbud.com/x-departures`;

// export const url = `https://napi.busbud.com/x-departures/${origin}/${destination}/${outbound_date}`;

export const headers = {
  Accept: `application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/`,
  'X-Busbud-Token': process.env.React_APP_TOKEN,
};
