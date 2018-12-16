import { createAction } from 'redux-actions';

import * as ActionTypes from './actionTypes';

export const setSearchFilter = createAction(ActionTypes.SET_SEARCH_FILTER);
export const performSearch = createAction(ActionTypes.PERFORM_SEARCH.BASE);
export const updateSearchQuery = createAction(ActionTypes.UPDATE_SEARCH_QUERY.BASE);
export const performSpecificSearch = createAction(ActionTypes.PERFORM_SPECIFIC_SEARCH);
