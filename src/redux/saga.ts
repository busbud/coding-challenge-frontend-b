import { all, fork } from "redux-saga/effects";
import departureSaga from "../departures/redux/sagas/departureSaga";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function* rootSaga() {
  yield all([fork(departureSaga)]);
}
