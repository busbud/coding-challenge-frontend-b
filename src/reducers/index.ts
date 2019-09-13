import { StoreState } from "../types/StoreState";

const initialState = {
  language: "en",
  searching: false,
  departures: [],
  locations: [],
  operators: [],
  cities: []
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
    case "LOAD_DEPARTURES":
      if (action.polling) {
        // If polling, we want to add to the existing list
        return {
          ...state,
          departures: [...state.departures, action.departures],
          locations: [...state.locations, action.locations],
          operators: [...state.operators, action.operators],
          cities: [...state.cities, action.cities]
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
