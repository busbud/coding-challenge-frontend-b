import types from "./types";

const initialState = {
    departures: [],
    locations: [],
    cities: [],
    isSearching: false,
    isFetchingCity: false,
    error: false
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_SEARCH: 
            return {
                ...state,
                isSearching: true,
            };

        case types.GET_SEARCH_SUCCESS: 
            return {
                ...state,
                departures: action.results.departures,
                locations: action.results.locations,
                isSearching: false,
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
