import { actions } from '../actions/routes';

export const initialState = {
  list: [],
  error: null,
  isLoading: false,
  isComplete: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case actions.ROUTES_FETCH_BEGIN:
      return {
        ...state,
        list: [],
        isLoading: true,
        isComplete: null,
        error: null,
      };
    case actions.ROUTES_FETCH_SUCCESS:
      return {
        ...state,
        list: action.routes,
        isLoading: false,
        isComplete: action.isComplete,
        error: null,
      };
    case actions.ROUTES_FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isComplete: null,
        error: action.error,
      };
    default:
      return state;
  }
};
