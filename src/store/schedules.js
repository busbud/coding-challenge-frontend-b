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
        data: {
          isLoading: !json.complete,
          departures: json.departures
        }
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
        data: json
      })
    })
  }
}

/*
 * schedules init state
 */
const initState = {
  isLoading: false,
  departures: []
}

export default function reducer (state = initState, action) {
  switch(action.type) {
    case INITIALIZE_SEARCH_REQUESTED:
      return Object.assign({}, state, {
        isLoading: true,
        departures: []
      })
    case INITIALIZE_SEARCH_SUCCESSFUL:
      return Object.assign({}, state, action.data)
    case POLL_SEARCH_SUCCESSFUL:
      return Object.assign({}, state, {
        isLoading: !action.data.complete,
        departures: [
          ...state.departures,
          ...action.data.departures
        ]
      })
    default:
      return state
  }
}
