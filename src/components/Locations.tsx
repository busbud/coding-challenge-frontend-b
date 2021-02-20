import { createContext } from "react";
import { Location } from "../types";

export const LocationContext = createContext<Location[]>([]);
const Locations = LocationContext.Provider;
export default Locations;
