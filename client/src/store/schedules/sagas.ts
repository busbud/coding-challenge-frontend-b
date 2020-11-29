import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { getSchedules as getSchedulesAction } from './actions';
// import { init as initAction } from './actions';
import { getSchedulesData } from '../../api/schedules';
import { Schedules } from '../../api/interfaces';

export function* getSchedules(action: any) {
    let schedules: Schedules;
    try {
        console.log(action?.payload);
        schedules = yield call(getSchedulesData, action?.payload);
        yield put(getSchedulesAction.success(schedules));
    } catch (err) {
        console.log(err);
        yield put(getSchedulesAction.failure(err));
    }
}

function* watchGetSchedules() {
    yield takeEvery(getType(getSchedulesAction.request), getSchedules);
}

function* schedulesSaga() {
    yield all([fork(watchGetSchedules)]);
}

export default schedulesSaga;
