import { AllEffect, all, fork } from 'redux-saga/effects';

import departureSagas from '../departures/redux/sagas';

export function* rootSaga(): Generator<AllEffect<unknown>> {
    yield all([fork(departureSagas)]);
}
