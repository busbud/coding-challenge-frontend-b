/***
 * @author Shiming Chen <chen@lemontv.me>
 */

import { handleResponse, headers, queryBuilder } from './uitls';

const LOCATIONS_SEARCH_REQUESTED  = 'LOCATIONS_SEARCH_REQUESTED';
const LOCATIONS_SEARCH_SUCCESSFUL  = 'LOCATIONS_SEARCH_SUCCESSFUL';

//https://napi.busbud.com/search?q=Mo&origin_id=375dd587-9001-acbd-84a4-683deda84183&limit=5&lang=en&locale=en

/***
 * When user submit the form, send the evalution data to server
 */
export function searchLocation (q) {
  return (dispatch, getState) => {
    const { locale } = getState()

    dispatch({
      type: LOCATIONS_SEARCH_REQUESTED
    });

    const queryURL = queryBuilder(['search'], {
      q,
      lang: locale.lang,
      locale: locale.lang,
      limit: 5
    });

    const options = { headers };

    return fetch(queryURL, options).then(handleResponse).then(json => {
    });
  }
}

/*
 * schedules init state
 */
const initState = {
}

export default function reducer (state = initState, action) {
  switch(action.type) {
    case LOCATIONS_SEARCH_REQUESTED:
      return state
    case LOCATIONS_SEARCH_SUCCESSFUL:
      return state
    default:
      return state
  }
}
