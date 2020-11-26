let apiUrl: string;
let headers = {
  Accept:
    'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': '',
};

export const init = (params: Record<'apiToken' | 'apiUrl', string>) => {
  apiUrl = params.apiUrl;
  headers['X-Busbud-Token'] = params.apiToken;
};

export const getHeaders = (extra?: Record<string, string>) => ({
  ...extra,
  ...headers,
});

export const getApiUrl = () => apiUrl;
