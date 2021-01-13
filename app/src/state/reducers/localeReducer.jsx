import { SET_LOCALE } from "../actions/action-types";

const INITIAL_STATE = {
  locale: "en",
};

const localeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOCALE: {
      return {
        ...state,
        locale: action.locale,
      };
    }
    default:
      return state;
  }
};

export default localeReducer;
