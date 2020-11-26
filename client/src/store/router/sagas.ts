import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { LocationChangeAction } from 'connected-react-router';
import { getType } from 'typesafe-actions';
import * as queryString from 'query-string';

export function* locationChange(action: LocationChangeAction) {
    const path = action.payload.location.pathname;
}

function* watchLocationChange() {
    yield takeEvery('@@router/LOCATION_CHANGE', locationChange);
}

function* routerSaga() {
    yield all([fork(watchLocationChange)]);
}

export default routerSaga;
