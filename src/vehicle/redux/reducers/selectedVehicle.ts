import {FETCH_VEHICLE_TYPES} from '../actions/constants';
import type {
    VehicleSelectedState,
    VehiclesActions,
} from '../actions/types';

const initialState: VehicleSelectedState = {
    selectedVehicleId: -1,
};

export default (
    state = initialState,
    action: VehiclesActions,
): VehicleSelectedState => {
    switch (action.type) {
        case FETCH_VEHICLE_TYPES.SET_VEHICLE_SELECTED:
            return {
                ...state,
                selectedVehicleId: action.payload.selected
                    ? action.payload.id
                    : -1,
            };
        default:
            return {
                ...state,
            };
    }
};
