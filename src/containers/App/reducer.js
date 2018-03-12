import {
  UPDATE_QUERY,
  FETCH_DEPARTURES,
  FETCH_DEPARTURES_SUCCESS,
  FETCH_DEPARTURES_ERROR,
  FETCH_DEPARTURES_COMPLETE,
} from './constants';
import { evolve, always, mergeDeepLeft } from 'ramda';
// import xDepartures from '../../fixtures/xDepartures';

const initialState = {
  isFetching: false,
  hasError: false,
  query: {
    path: {
      origin: 'dr5reg',
      destination: 'f25dvk',
      outbound_date: '2018-08-02',
    },
    params: {
      adult: null,
      child: null,
      senior: null,
      lang: null,
      currency: null,
    },
  },
  xDepartures: null,
};

export default (state = initialState, { type, query, xDepartures }) => {
  switch (type) {
    case UPDATE_QUERY:
      return evolve(
        {
          query: mergeDeepLeft(query),
        },
        state,
      );
    case FETCH_DEPARTURES:
      return evolve(
        {
          hasError: always(false),
          isFetching: always(true),
        },
        state,
      );
    case FETCH_DEPARTURES_SUCCESS:
      return evolve(
        {
          hasError: always(false),
          xDepartures: always(xDepartures),
        },
        state,
      );
    case FETCH_DEPARTURES_ERROR:
      return evolve(
        {
          hasError: always(true),
        },
        state,
      );

    case FETCH_DEPARTURES_COMPLETE:
      return evolve(
        {
          isFetching: always(false),
        },
        state,
      );

    default:
      return state;
  }
};
