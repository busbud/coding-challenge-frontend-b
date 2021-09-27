import type { DeparturesState } from "@src/departures/redux/types";
import { useSelector } from "react-redux";
import type { RootState } from "./reducer";

export const useDepartureSelector = (): DeparturesState => useSelector((state: RootState) => state['DEPARTURE_REDUCER'])