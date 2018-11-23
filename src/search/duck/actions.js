import types from './types';

const requestSearch = () => ({
    type: types.GET_SEARCH,
});

const receiveSearchResults = results => ({
    type: types.GET_SEARCH_SUCCESS,
    results
});

const receiveSearchResultsFail = error => ({
    type: types.GET_SEARCH_FAILURE,
    error
});

export default {
    requestSearch,
    receiveSearchResults,
    receiveSearchResultsFail,
};
