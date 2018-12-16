import { createRequest } from 'redux-saga-request';

export const SET_SEARCH_FILTER = 'SET_SEARCH_FILTER';
export const PERFORM_SEARCH = createRequest('PERFOM_SEARCH');
export const UPDATE_SEARCH_QUERY = createRequest('UPDATE_SEARCH_QUERY');
export const PERFORM_SPECIFIC_SEARCH = 'PERFORM_SPECIFIC_SEARCH';
