import { createAction } from 'redux-actions';

import * as ActionTypes from './actionTypes';

export const initSearch = createAction(ActionTypes.PERFORM_SEARCH.BASE);
export const onSearchStarted = createAction(ActionTypes.PERFORM_SEARCH.STARTED);
export const onSearchSucceed = createAction(ActionTypes.PERFORM_SEARCH.SUCCEEDED);
export const dispatchResult = createAction(ActionTypes.DISPATCH_RESULT);
export const dispatchPartialResult = createAction(ActionTypes.DISPATCH_PARTIAL_RESULT);
