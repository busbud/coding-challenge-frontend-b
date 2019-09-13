import { StoreState } from "../types/StoreState";
import IDeparture from "../types/departure";

const initialState = {
  language: "en",
  searching: false,
  departures: [],
  locations: [],
  operators: [],
  cities: [],
  error: ""
};

export default (state: StoreState = initialState, action: any): StoreState => {
  switch (action.type) {
    case "UPDATE_LANGUAGE":
      return { ...state, language: action.language };
    case "START_SEARCHING": {
      return { ...state, searching: true };
    }
    case "DONE_SEARCHING": {
      return { ...state, searching: false };
    }
    case "SET_ERROR": {
      return { ...state, error: action.message };
    }
    case "CLEAR_ERROR": {
      return { ...state, error: "" };
    }
    case "SORT_BY_PRICE": {
      return {
        ...state,
        departures: [
          ...state.departures.sort(
            (a: IDeparture, b: IDeparture) => a.prices.total - b.prices.total
          )
        ]
      };
    }
    case "SORT_BY_TIME": {
      return {
        ...state,
        departures: [
          ...state.departures.sort((a: IDeparture, b: IDeparture) => {
            return (
              new Date(a.departure_time).getTime() -
              new Date(b.departure_time).getTime()
            );
          })
        ]
      };
    }
    case "LOAD_DEPARTURES":
      if (action.polling) {
        // If polling, we want to add to the existing list
        return {
          ...state,
          departures: [...state.departures, ...action.departures],
          locations: [...state.locations, ...action.locations],
          operators: [...state.operators, ...action.operators],
          cities: [...state.cities, ...action.cities]
        };
      }
      // If not polling, we want to replace the existing list
      return {
        ...state,
        departures: action.departures,
        locations: action.locations,
        operators: action.operators,
        cities: action.cities
      };
    default:
      return state;
  }
};
