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
  // FIXME: remove data
  /* eslint-disable */
  data: [
    {
      id: "7c5dd26a",
      source_id: 155,
      checkout_type: "new",
      operator_id: "bfc27cd544ca49c18d000f2bc00c58c0",
      origin_location_id: 1942,
      destination_location_id: 1938,
      class: "Economy",
      class_name: "Economy",
      amenities: {
        display_name: "Economy",
        wifi: true,
        toilet: true,
        ac: true,
        food: false,
        refreshment: false,
        power_outlets: true,
        tv: false,
        bus_attendant: false,
        leg_room: false,
      },
      available_seats: 55,
      prices: {
        total: 5200,
        breakdown: {
          base: 5200,
        },
        categories: {},
        discounted: false,
      },
      ticket_types: ["print"],
      departure_timezone: "America/New_York",
      arrival_timezone: "America/Montreal",
      departure_time: "2016-01-14T00:01:00",
      arrival_time: "2016-01-14T07:55:00",
    },
    {
      id: "7c5dd26b",
      source_id: 155,
      checkout_type: "new",
      operator_id: "bfc27cd544ca49c18d000f2bc00c58c0",
      origin_location_id: 1942,
      destination_location_id: 1938,
      class: "Economy",
      class_name: "Economy",
      amenities: {
        display_name: "Economy",
        wifi: true,
        toilet: true,
        ac: true,
        food: false,
        refreshment: false,
        power_outlets: true,
        tv: false,
        bus_attendant: false,
        leg_room: false,
      },
      available_seats: 55,
      prices: {
        total: 5200,
        breakdown: {
          base: 5200,
        },
        categories: {},
        discounted: false,
      },
      ticket_types: ["print"],
      departure_timezone: "America/New_York",
      arrival_timezone: "America/Montreal",
      departure_time: "2016-01-14T00:01:00",
      arrival_time: "2016-01-14T07:55:00",
    },

    {
      id: "7c5dd26c",
      source_id: 155,
      checkout_type: "new",
      operator_id: "bfc27cd544ca49c18d000f2bc00c58c0",
      origin_location_id: 1942,
      destination_location_id: 1938,
      class: "Economy",
      class_name: "Economy",
      amenities: {
        display_name: "Economy",
        wifi: true,
        toilet: true,
        ac: true,
        food: false,
        refreshment: false,
        power_outlets: true,
        tv: false,
        bus_attendant: false,
        leg_room: false,
      },
      available_seats: 55,
      prices: {
        total: 5200,
        breakdown: {
          base: 5200,
        },
        categories: {},
        discounted: false,
      },
      ticket_types: ["print"],
      departure_timezone: "America/New_York",
      arrival_timezone: "America/Montreal",
      departure_time: "2016-01-14T00:01:00",
      arrival_time: "2016-01-14T07:55:00",
    },

    /* eslint-enable */
  ],
  loaded: true,
  loading: false,
};

export const Schedules = (
  state: TState = defaultState,
  action: TAction
): TState => {
  const { error, payload, type } = action;
  switch (type) {
    case actionTypes.DEPARTURE_FETCH_START:
      return {
        ...state,
        currentRequest: payload?.currentRequest,
        loading: true,
      };
      break;
    case actionTypes.DEPARTURE_FETCH_ERROR:
      return { ...state, error: error, loaded: true, loading: false };
      break;
    case actionTypes.DEPARTURE_FETCH_SUCCESS:
      return { ...state, data: payload?.data, loaded: true, loading: false };
      break;
    default:
      return state;
  }
};
