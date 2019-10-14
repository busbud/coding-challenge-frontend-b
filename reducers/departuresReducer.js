import {
  GET_DEPARTURES_SUCCEEDED,
  GET_DEPARTURES_FAILED,
  FETCH_DEPARTURES,
} from '../actions/departuresActions';

const defaultState = {
  list: [],
  error: null,
  isFetching: false,
};

const departures = (state = defaultState, action) => {
  let newState;
  switch (action.type) {
    case FETCH_DEPARTURES: {
      newState = {
        ...state,
        isFetching: true,
        list: action.fresh ? [] : state.list,
      };
      return newState;
    }
    case GET_DEPARTURES_SUCCEEDED: {
      newState = {
        ...state,
        list: [...state.list, ...action.departures],
        isFetching: !action.complete,
      };
      return newState;
    }
    case GET_DEPARTURES_FAILED: {
      newState = {
        ...state,
        error: action.error,
        isFetching: false,
      };
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default departures;
