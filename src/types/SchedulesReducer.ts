import { TScheduleDepartureRequest } from "./Requests";
export type TScheduleReducerState = {
  data: any[];
  currentRequest?: TScheduleDepartureRequest;
  error?: Error;
  loading: boolean;
  loaded: boolean;
};
