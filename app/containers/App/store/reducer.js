/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  CHANGE_SEARCH_PARAMS,
  LOAD_DEPARTURES_SUCCESS,
  LOAD_DEPARTURES,
  LOAD_DEPARTURES_ERROR,
  QUEBEC,
  MONTREAL,
} from '../constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  searchParams: {
    origin: QUEBEC,
    destination: MONTREAL,
    outboundDate: new Date().toISOString(),
    adult: 1,
  },
  searchResult: {
    departures: false,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_SEARCH_PARAMS:
        draft.searchParams = action.searchParams;
        break;

      case LOAD_DEPARTURES:
        draft.loading = true;
        draft.error = false;
        draft.searchResult.departures = false;
        break;

      case LOAD_DEPARTURES_SUCCESS:
        draft.searchResult.departures = action.departures;
        draft.loading = false;
        break;

      case LOAD_DEPARTURES_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
