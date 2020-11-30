import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import { getType } from 'typesafe-actions';
import { getSchedules as getSchedulesAction } from './actions';
import { getSchedulesData } from '../../api/schedules';
import { Schedules } from '../../api/interfaces';

const delay = (time: number) =>
    new Promise((resolve) => setTimeout(resolve, time));

export function* getSchedules(action: any) {
    let schedules: Schedules;
    try {
        schedules = yield call(getSchedulesData, action?.payload);
        yield put(getSchedulesAction.success(schedules));
        let { complete, departures } = schedules;
        while (!complete) {
            yield call(delay, 3000);
            const payload = { ...action?.payload, index: departures?.length };
            const newSchedules = yield call(getSchedulesData, payload);
            const newDepartures = [...newSchedules.departures];
            ({ complete } = newSchedules);
            const allDepartures = departures.concat(newDepartures);
            yield put(
                getSchedulesAction.success({
                    ...schedules,
                    departures: allDepartures,
                    complete
                })
            );
        }
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
