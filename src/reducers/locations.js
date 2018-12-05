import { CLEAN_STORE, SEARCH_REQUEST_SUCCESS } from '../constants/actionTypes';

const locations = (state = {}, action) => {
    switch (action.type) {
        case CLEAN_STORE:
            return {}    
        case SEARCH_REQUEST_SUCCESS:
            const newState = {...state};
            return Object.assign(newState, action.locations);
        default:
            return state
    }
}

export default locations;