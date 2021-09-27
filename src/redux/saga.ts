import { AnyAction } from "redux";
import { all, AllEffect, fork } from "redux-saga/effects";
import vehicleSaga from "../vehicle/redux/sagas/vehicleSaga";

export function* rootSaga(): Generator<AllEffect<AnyAction>> {
  yield all([fork(vehicleSaga)]);
}
