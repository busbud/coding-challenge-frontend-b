import { VehicleSelectedState, VehiclesState } from "src/vehicle/redux/actions/types";
import { useSelector } from "react-redux";
import { Reducers } from "./constants";
import type { RootState } from "./reducer";

export const useVehicleSelector = (): VehiclesState => useSelector((state: RootState) => state[Reducers.VEHICLE_REDUCER])
export const useVehicleSelectedSelector = (): VehicleSelectedState => useSelector((state: RootState) => state[Reducers.SELECTED_VEHICLE_REDUCER])