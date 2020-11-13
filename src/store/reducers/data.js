import * as t from '../actions/actionTypes';

const INITIAL_STATE = {
  loading: false,
  departures: null,
  error: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case t.START_GETTING_DATA:
      return { ...INITIAL_STATE, loading: true };
    case t.SET_DEPARTURES:
      return { ...INITIAL_STATE, departures: action.departures };
    case t.SET_FETCH_ERROR:
      return { ...INITIAL_STATE, error: action.error };
    default:
      return state;
  }
};
