let apiUrl: string;
let headers = {
  Accept: '',
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
