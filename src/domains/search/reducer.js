// flow

import * as ActionTypes from './actionTypes';

export const initialState = {
  searchQuery: {
    filter: 'all',
  },
};

const onPerformSearch = state => ({
  ...state,
  isLoading: true,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.PERFORM_SEARCH.BASE:
      return onPerformSearch(state, action.payload);
    default:
      return state;
  }
}
