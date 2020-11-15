import { TAction, TScheduleReducerState as TState } from "../types";
import { actionTypes } from "../actions";

export const defaultState: TState = {
  currentRequest: {
    adultTickets: 1,
    childTickets: 0,
    currency: "CAD",
    destination: "f25dvk",
    lang: "fr",
    origin: "f2m673",
    outboundDate: "2020-12-01",
    seniorTickets: 0,
  },
  data: [],
  loaded: false,
  loading: false,
};

export const Schedules = (
  state: TState = defaultState,
  action: TAction
): TState => {
  const { error, payload, type } = action;
  switch (type) {
    case actionTypes.DEPARTURE_FETCH_START:
      // eslint-disable-next-line
      return {
        ...state,
        currentRequest: payload?.currentRequest,
        loading: true,
      };
    case actionTypes.DEPARTURE_FETCH_ERROR:
      return { ...state, error: error, loaded: true, loading: false };
    case actionTypes.DEPARTURE_FETCH_SUCCESS:
      return { ...state, data: payload?.data, loaded: true, loading: false };
    default:
      return state;
  }
};
