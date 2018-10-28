/***
 * @author Shiming Chen <chen@lemontv.me>
 */

import { handleResponse, headers, queryBuilder } from './uitls';

const INITIALIZE_SEARCH_REQUESTED  = 'FETCH_REQUESTED';
const INITIALIZE_SEARCH_SUCCESSFUL  = 'INITIALIZE_SEARCH_SUCCESSFUL';
const POLL_SEARCH_SUCCESSFUL = 'POLL_SEARCH_SUCCESSFUL';

/***
 * When user submit the form, send the evalution data to server
 */
export function initializeSearchSchedules ({origin, destination, outbound_date}, params) {
  return (dispatch, getState) => {
    const { schedules } = getState();
    /* When there is data loading return null */
    if (schedules.isLoading) { return; }

    const queryURL = queryBuilder(['x-departures', origin, destination, outbound_date], params);
    const options = { headers };

    dispatch({
      type: INITIALIZE_SEARCH_REQUESTED
    });

    return fetch(queryURL, options).then(handleResponse).then(json => {
      dispatch({
        type: INITIALIZE_SEARCH_SUCCESSFUL,
        cities: json.cities,
        departures: json.departures,
        locations: json.locations.reduce((_, location) => ({..._, [location.id]: location}), {}),
        isLoading: !json.complete
      })

      if (!json.complete) {
        const timer = setInterval(() => {
          pollSearchSchedules({origin, destination, outbound_date}, params)(dispatch, getState).then(() => {
            const { schedules } = getState();
            if (!schedules.isLoading) { clearInterval(timer); }
          })
        }, 4000);
      }
    });
  }
}

export function pollSearchSchedules ({origin, destination, outbound_date}, params) {
  return (dispatch, getState) => {
    const { schedules } = getState();

    const options = { headers };
    const queryURL = queryBuilder(['x-departures', origin, destination, outbound_date, 'poll'], {
      ...params,
      index: schedules.departures.length
    });

    return fetch(queryURL, options).then(handleResponse).then(json => {
      return dispatch({
        type: POLL_SEARCH_SUCCESSFUL,
        departures: json.departures,
        isLoading: !json.complete
      })
    })
  }
}

/*
 * schedules init state
 */
const initState = {
  isLoading: false,
  cities: [],
  departures: [],
  locations: {}
}

export default function reducer (state = initState, action) {
  switch(action.type) {
    case INITIALIZE_SEARCH_REQUESTED:
      return Object.assign({}, state, {
        isLoading: true,
        cities: [],
        departures: [],
        locations:{}
      })
    case INITIALIZE_SEARCH_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        cities: action.cities,
        departures: action.departures,
        locations: action.locations
      })
    case POLL_SEARCH_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoading: action.isLoading,
        departures: [
          ...state.departures,
          ...action.departures
        ]
      })
    default:
      return state
  }
}
