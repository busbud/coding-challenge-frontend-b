import {isEqual} from 'lodash';

export const reducer = (state = false, { type }) => {
    switch (type) {
        case 'FETCH_ACTION':
            return  true;
        case 'FETCH_ERROR':
        case 'FETCH_SUCCESS':
            return isEqual(state, false) ? state : false;
        default:
            return state;
    }
};
