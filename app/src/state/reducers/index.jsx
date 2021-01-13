import { combineReducers } from "redux";
import localeReducer from "./localeReducer";

const rootReducer = combineReducers({
  i18n: localeReducer,
});

export default rootReducer;
