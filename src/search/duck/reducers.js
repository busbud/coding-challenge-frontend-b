import types from "./types";

const initialState = {
    departures: [],
    locations: [],
    cities: [],
    isCompleteResults: false,
    isSearching: false,
    isFetchingCity: false,
    error: false
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CLEAR_SEARCH:
            return {
                ...state,
                departures: initialState.departures,
            };

        case types.GET_SEARCH: 
            return {
                ...state,
                isSearching: true,
            };

        case types.GET_SEARCH_SUCCESS: 
            return {
                ...state,
                isCompleteResults: action.results.complete,
                departures: [ ...state.departures, ...action.results.departures ],
                locations: action.results.locations,
                isSearching: !(state.isSearching && action.results.complete),
            };

        case types.GET_SEARCH_FAILURE:
            return {
                ...state,
                error: action.error,
                isSearching: false
            };

        case types.GET_CITY: 
            return {
                ...state,
                isFetchingCity: true,
            };

        case types.GET_CITY_SUCCESS: 
            return {
                ...state,
                cities: [ ...state.cities, action.results ],
                isFetchingCity: false,
            };

        case types.GET_CITY_FAILURE:
            return {
                ...state,
                error: action.error,
                isFetchingCity: false
            };

        default: 
            return state;
    }
}

export default searchReducer;
