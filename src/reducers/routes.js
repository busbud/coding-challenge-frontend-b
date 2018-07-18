import { actions } from '../actions/routes';

export const initialState = {
  list: [],
  error: null,
  isComplete: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actions.ROUTES_FETCH_BEGIN:
      return {
        ...state,
        list: [],
        isComplete: false,
        error: null,
      };
    case actions.ROUTES_FETCH_ADD: {
      return {
        ...state,
        list: state.list.concat(action.routes).sort((d1, d2) =>
          (d1.departure.date.localeCompare(d2.departure.date))
        ),
        isComplete: false,
        error: null,
      };
    }
    case actions.ROUTES_FETCH_SUCCESS:
      return {
        ...state,
        isComplete: true,
        error: null,
      };
    case actions.ROUTES_FETCH_FAILURE:
      return {
        ...state,
        isComplete: null,
        error: action.error,
      };
    default:
      return state;
  }
};
