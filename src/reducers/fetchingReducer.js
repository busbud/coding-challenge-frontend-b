import { SET_FETCHING, UNSET_FETCHING } from '../actions/actionTypes';

const initialState = false;

export const fetching = (state = initialState, action) => {
  switch (action.type) {
    case SET_FETCHING:
      return true;

    case UNSET_FETCHING:
      return false;

    default:
      return state;
  }
};
