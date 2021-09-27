import departureService from '@src/api/departureService';
import {IDeparture} from '@src/types';
import {END, EventChannel, eventChannel} from 'redux-saga';
import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';

import {
    fetchDeparturesFailure,
    fetchDeparturesSuccess,
    fetchExtraDeparturesSuccess,
} from '../actions/departure';
import {FETCH_DEPARTURE_TYPES} from '../actions/types';
import type {
    FetchDeparturesRequest,
} from '../types';

export interface ResponseGenerator {
    config?: never;
    data?: any;
    headers?: never;
    request?: never;
    status?: number;
    statusText?: string;
}

const createDepartures = (responseData: any): IDeparture[] => {
    return responseData.departures.map((data: any) => {
        return {
            key: data.id,
            id: data.id,
            departureTime: data.departure_time,
            arrivalTime: data.arrival_time,
            price: data.prices.total,
            location: responseData.locations?.find(
                (x: any) => x.id == data.origin_location_id,
            ).name,
            stops: data.trip_stops.map((stop: any) => {
                return {
                    departureTime: stop.departure_time,
                    arrivalTime: stop.arrival_time,
                    location: stop.name,
                    duration: stop.duration,
                };
            }),
        } as IDeparture;
    });
};

function* fetchDepartures(parameters: any): any {
    const response = yield call(departureService.getDepartures, {
        ...parameters,
    });

    const fetchFunction = parameters.poll
        ? fetchExtraDeparturesSuccess
        : fetchDeparturesSuccess;

    yield put(
        fetchFunction({
            departures: createDepartures(response.data),
        }),
    );

    return response;
}

function* fetchDeparturesSaga(request: FetchDeparturesRequest) {
    try {
        let response: ResponseGenerator = yield call(
            fetchDepartures,
            request.payload,
        );

        if (response?.data?.departures?.length > 0) {
            function countdown(): EventChannel<unknown> {
                return eventChannel((emitter) => {
                    const iv = setInterval(() => {
                        if (response.data.complete) {
                            emitter(END);
                        } else {
                            emitter('');
                        }
                    }, 3000);
                    return () => {
                        clearInterval(iv);
                    };
                });
            }

            const channel: EventChannel<unknown> = yield call(countdown);
            yield takeEvery(channel, function* () {
                response = yield call(fetchDepartures, {
                    ...request.payload,
                    poll: true,
                    departureCount: response.data?.departures.length,
                });
            });
        }
    } catch (e) {
        yield put(
            fetchDeparturesFailure({
                error: e.message,
            }),
        );
    }
}

function* departuresSaga(): any {
    yield all([
        takeLatest(
            FETCH_DEPARTURE_TYPES.FETCH_DEPARTURES_REQUEST,
            fetchDeparturesSaga,
        ),
    ]);
}

export default departuresSaga;
