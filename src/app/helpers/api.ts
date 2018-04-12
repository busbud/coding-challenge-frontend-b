const endpoint = 'https://napi.busbud.com/x-departures';
const buildQuery = (
  origin = "dr5reg" as string,
  destination = "f25dvk" as string, 
  outboundDate = "2018-08-02" as string, 
) => `${endpoint}/${origin}/${destination}/${outboundDate}`;

const headers = {
  Accept: 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': 'PARTNER_JSWsVZQcS_KzxNRzGtIt1A'
};

export const fetchSearch = () => fetch(
  buildQuery(),
  { headers },
).then(res => res.json()) 