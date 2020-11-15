import { TCityReducerState as TState } from "../types";

export const defaultState: TState = {
  data: [
    { geohash: "f25dvk", name: "Montréal" },
    { geohash: "f2m673", name: "Québec" },
  ],
  loaded: true,
  loading: false,
};

export const City = (state: TState = defaultState): TState => {
  return state;
};
