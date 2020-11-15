import { TCityReducerState } from "./CityReducer";
import { TScheduleReducerState } from "./SchedulesReducer";

export type TApplicationState = {
  cities: TCityReducerState;
  schedules: TScheduleReducerState;
};
