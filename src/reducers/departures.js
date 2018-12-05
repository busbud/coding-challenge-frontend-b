import { CLEAN_STORE, SEARCH_REQUEST_SUCCESS } from '../constants/actionTypes';

const departures = (state=[], action) => {
    switch (action.type) {
        case CLEAN_STORE:
            return [];
        case SEARCH_REQUEST_SUCCESS:
            return [...state.concat(action.departures)]
        default:
            return state
    }
}

export default departures;