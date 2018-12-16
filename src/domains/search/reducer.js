import * as ActionTypes from './actionTypes';
import { mapDocsToBooks } from './formatters';

export const initialState = {
  searchQuery: {
    filter: 'all',
    value: undefined,
    page: 1,
  },
  books: [],
  isLoading: false,
  itemCount: null,
};

const setSearchFilterValue = (state, payload) => ({
  ...state,
  searchFilter: payload,
});

const onPerformSearchSucceeded = (state, payload) => ({
  ...state,
  itemCount: payload.num_found,
  books: mapDocsToBooks(payload.docs),
  isLoading: false,
});

const onPerformSearch = state => ({
  ...state,
  isLoading: true,
});

const onUpdateSearchQuery = (state, payload) => ({
  ...state,
  searchQuery: {
    ...payload,
  },
});

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.PERFORM_SEARCH.BASE:
      return onPerformSearch(state, action.payload);
    case ActionTypes.PERFORM_SEARCH.SUCCEEDED:
      return onPerformSearchSucceeded(state, action.payload);
    case ActionTypes.SET_SEARCH_FILTER:
      return setSearchFilterValue(state, action.payload);
    case ActionTypes.UPDATE_SEARCH_QUERY.BASE:
      return onUpdateSearchQuery(state, action.payload);
    default: {
      return state;
    }
  }
}
