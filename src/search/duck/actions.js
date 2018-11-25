import types from './types';

const clearSearchResults = () => ({
    type: types.CLEAR_SEARCH,
});

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

const requestCity = () => ({
    type: types.GET_CITY,
});

const receiveCity = results => ({
    type: types.GET_CITY_SUCCESS,
    results
});

const receiveCityFail = error => ({
    type: types.GET_CITY_FAILURE,
    error
});

export default {
    clearSearchResults,
    
    requestSearch,
    receiveSearchResults,
    receiveSearchResultsFail,

    requestCity,
    receiveCity,
    receiveCityFail,
};
