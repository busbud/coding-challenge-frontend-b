import { combineReducers } from "redux";
import firstFetch from "./reducerAction";

//Defining the main Reducer

const rootReducer = combineReducers({
  firstFetch,
});

export default rootReducer;
