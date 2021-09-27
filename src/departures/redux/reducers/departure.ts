import {FETCH_DEPARTURE_TYPES} from '../actions/types';
import type {DeparturesActions, DeparturesState} from '../types';

const initialState: DeparturesState = {
    loading: false,
    departures: [],
    error: null,
};

export default (
    state = initialState,
    action: DeparturesActions,
): DeparturesState => {
    switch (action.type) {
        case FETCH_DEPARTURE_TYPES.FETCH_DEPARTURES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_DEPARTURE_TYPES.FETCH_DEPARTURES_SUCCESS:
            return {
                ...state,
                loading: false,
                departures: action.payload.departures,
                error: null,
            };
        case FETCH_DEPARTURE_TYPES.FETCH_EXTRA_DEPARTURES_SUCCESS:
            const {departures} = state;
            return {
                ...state,
                departures: [...departures, ...action.payload.departures],
            };
        case FETCH_DEPARTURE_TYPES.FETCH_DEPARTURES_FAILURE:
            return {
                ...state,
                loading: false,
                departures: [],
                error: action.payload.error,
            };
        default:
            return {
                ...state,
            };
    }
};
