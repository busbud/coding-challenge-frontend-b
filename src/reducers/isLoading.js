import { API_START, API_END } from '../constants/actionTypes';

export const isLoading = (state = {}, action) => {
  switch (action.type) {
    case API_START:
      return {
        ...state,
        [action.payload]: true
      };
    case API_END:
      return {
        ...state,
        [action.payload]: false
      };
    default:
      return state;
  }
};
