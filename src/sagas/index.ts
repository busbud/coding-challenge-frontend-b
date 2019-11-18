import { call, put, takeEvery, delay, select } from 'redux-saga/effects';
import {
  GET_DEPARTURES,
  GET_DEPARTURES_SUCCEEDED,
  // GET_DEPARTURES_FAILED,
  GetDeparturesAction
} from '../store/departures';
import loadData from '../helpers/api';

function* getDepartures(action: GetDeparturesAction) {
  try {
    yield delay(2000);
    const index = yield select(
      state => state.departures.data.departures.length
    );
    const data = yield call(loadData, { ...action.payload, index });
    yield put({ type: GET_DEPARTURES_SUCCEEDED, payload: data });
    if (!data.complete) {
      yield put({
        type: GET_DEPARTURES,
        payload: action.payload
      });
    }
  } catch (e) {
    console.error(e);
    // yield put({ type: GET_DEPARTURES_FAILED, message: e.message });
  }
}

function* sagas() {
  yield takeEvery(GET_DEPARTURES, getDepartures);
}

export default sagas;
