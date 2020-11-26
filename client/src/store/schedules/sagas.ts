import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { Schedule } from '../../api/schedules';
import { getSchedules as getSchedulesAction } from './actions';
// import { init as initAction } from './actions';
import { getSchedulesData } from '../../api/schedules';

export function* getSchedules(action: any) {
    let schedules: Schedule[];
    try {
        // schedules = yield call(getSchedulesData, action?.payload);
        // yield put(getSchedulesAction.success(schedules));
    } catch (err) {
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
