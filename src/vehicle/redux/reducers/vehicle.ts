import {FETCH_VEHICLE_TYPES} from '../actions/constants';
import type {VehiclesActions, VehiclesState} from '../actions/types';

const initialState: VehiclesState = {
    loading: false,
    vehicles: [],
    pageIndex: 1,
    error: null,
};

export default (
    state = initialState,
    action: VehiclesActions,
): VehiclesState => {
    switch (action.type) {
        case FETCH_VEHICLE_TYPES.FETCH_VEHICLES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_VEHICLE_TYPES.FETCH_VEHICLES_SUCCESS:
            return {
                ...state,
                loading: false,
                vehicles: action.payload.vehicles,
                error: null,
            };
        case FETCH_VEHICLE_TYPES.SET_VEHICLE_PAGE:
            return {
                ...state,
                loading: false,
                pageIndex: action.payload.pageIndex,
                error: null,
            };
        case FETCH_VEHICLE_TYPES.FETCH_VEHICLES_FAILURE:
            return {
                ...state,
                loading: false,
                vehicles: [],
                error: action.payload.error,
            };
        default:
            return {
                ...state,
            };
    }
};
