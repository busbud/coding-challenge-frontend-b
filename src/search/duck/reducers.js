import types from "./types";

const initialState = {
    results: [],
    isSearching: false,
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
                results: action.results,
                isSearching: false,
            };

        case types.GET_SEARCH_FAILURE:
            return {
                ...state,
                error: action.error,
                isSearching: false
            };

        default: 
            return state;
    }
}

export default searchReducer;
