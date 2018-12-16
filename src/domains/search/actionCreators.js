import { createAction } from 'redux-actions';

import * as ActionTypes from './actionTypes';

export const initSearch = createAction(ActionTypes.INIT_SEARCH.BASE);
export const dispatchResult = createAction(ActionTypes.DISPATCH_RESULT);
