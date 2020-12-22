import { call, put, takeEvery, delay, select } from "redux-saga/effects";
import { get } from "lodash";
import { fetchDepartures } from "../api";

function* getDepartures(action) {
  try {
    yield delay(1000);
    const index = yield select(state =>
      get(state, "departures.departures.length", 0)
    );
    const response = yield call(fetchDepartures, {
      ...action.pathParams,
      index
    });
    yield put({ type: "FETCH_SUCCESS", payload: response });
    if (!response.complete) {
      yield put({
        type: "FETCH_ACTION",
        pathParams: { ...action.pathParams, isPolling: true, index }
      });
    }
  } catch (e) {
    console.error(e);
    yield put({ type: "FETCH_ERROR", message: e.message });
  }
}

function* sagas() {
  yield takeEvery("FETCH_ACTION", getDepartures);
}

export default sagas;
