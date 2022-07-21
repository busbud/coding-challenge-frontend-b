const token = 'PARTNER_c9g6z7V0SNqUlnar2EFsxw';

const defaultConfig = {
  method: 'GET',
  headers: {
    Accept:
      'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
    'X-Busbud-Token': token,
  },
};

const API_URL = 'https://napi.busbud.com/x-departures';

const configureParameters = (params) => {
  let firstParam = true;
  let endpoint = '';

  for (const param of Object.keys(params)) {
    const prefix = firstParam ? '?' : '&';

    if (firstParam) {
      firstParam = false;
    }

    endpoint += `${prefix}${param}=${params[param]}`;
  }

  return endpoint;
};

export const getDepartures = async (origin, destination, date, queryParams) => {
  const configuredQueryParams = configureParameters(queryParams);

  const url = `${API_URL}/${origin}/${destination}/${date}${configuredQueryParams}`;

  const response = await fetch(url, defaultConfig);

  const departures = await response.json();

  return departures;
};
