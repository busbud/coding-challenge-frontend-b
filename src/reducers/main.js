import { combineReducers, Reducer } from "redux";
import { City } from "./City";
import { Schedules } from "./Schedules";

export const getReducers = (): Reducer => {
  return combineReducers({
    city: City,
    schedules: Schedules,
  });
};
