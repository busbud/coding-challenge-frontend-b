/**
 * @author Shiming Chen <chen@lemontv.me>
 */

export const headers = {
  'Accept': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
  'X-Busbud-Token': process.env.REACT_APP_API_TOKEN
}

/**
 * Handle response from fetch function
 * @param {Response} response
 * @returns {Object}
 */
export function handleResponse (response) {
  if (response.ok) {
    return response.json();
  } else {
    /* @todo Handle errors */
    return {}
  }
}

/**
 * Generate URL search params
 * @param {Object} params
 * @returns {String}
 */
export function paramsBuilder (params) {
  let searchParams = new URLSearchParams();

  if (typeof params === 'object') {
    for(let key in params) {
      if (params[key]) {
        searchParams.append(key, params[key]);
      }
    }
  }

  return searchParams.toString();
}

/**
 * handle response from fetch function
 * @param {Object} params
 * @returns {String}
 */
export function queryBuilder (endpoints, params) {
  const apiURL = process.env.REACT_APP_API_URL;
  const path = endpoints.join('/');
  const queryURL = `${apiURL}/${path}`;
  const searchParams = paramsBuilder(params);

  if (searchParams !== '') {
    return `${queryURL}?${searchParams}`;
  } else {
    return queryURL;
  }
}
