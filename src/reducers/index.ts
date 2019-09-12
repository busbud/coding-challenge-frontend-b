import { StoreState } from "../types/StoreState";

const initialState = {
  language: "en"
};

export default (state: StoreState = initialState, action: any): StoreState => {
  switch (action.type) {
    case "UPDATE_LANGUAGE":
      return { ...state, language: action.language };
    default:
      return state;
  }
};
