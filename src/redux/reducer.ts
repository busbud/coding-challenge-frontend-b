import { combineReducers } from "redux";
import departureReducer from "@src/departures/redux/reducers/departure";

const rootReducer = combineReducers({
  'DEPARTURE_REDUCER': departureReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
