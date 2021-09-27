import { combineReducers } from "redux";
import vehicleReducer from "src/vehicle/redux/reducers/vehicle";
import selectedVehicleReducer from "src/vehicle/redux/reducers/selectedVehicle";

import { Reducers } from "./constants";

const rootReducer = combineReducers({
  [Reducers.VEHICLE_REDUCER]: vehicleReducer,
  [Reducers.SELECTED_VEHICLE_REDUCER]: selectedVehicleReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
