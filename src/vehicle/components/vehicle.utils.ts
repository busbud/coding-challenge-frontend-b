import { RateType, State, VehicleType } from "src/types/enums";
import { FREENOW_COLOR, SHARENOW_COLOR } from "./vehicle.constants";

export const getVehicleColor = (state: string): string => {
    if (state === VehicleType.FREENOW) return FREENOW_COLOR;
    if (state === VehicleType.SHARENOW) return SHARENOW_COLOR;

    return '';
};
