import { AnyAction } from 'redux';
import { END, EventChannel, eventChannel } from 'redux-saga';
import {
    CallEffect,
    ForkEffect,
    PutEffect,
    call,
    put,
    takeEvery,
} from 'redux-saga/effects';
import departureService from 'src/api/departureService';
import type { DepartureRequestParameters, ResponseGenerator } from 'src/types';

import {
    fetchDeparturesFailure,
    fetchDeparturesSuccess,
    fetchExtraDeparturesSuccess,
} from '../actions/departure';
import type { FetchDeparturesRequest } from '../types';
import { createDepartures } from './utils';

function* fetchDepartures(
    parameters: DepartureRequestParameters,
): Generator<
    CallEffect<unknown> | PutEffect<AnyAction>,
    ResponseGenerator,
    ResponseGenerator
> {
    const response: ResponseGenerator = yield call(
        departureService.getDepartures,
        {
            ...parameters,
        },
    );

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

export function* fetchDeparturesSaga(
    request: FetchDeparturesRequest,
): Generator<
    | CallEffect<ResponseGenerator | EventChannel<unknown>>
    | PutEffect<AnyAction>
    | ForkEffect<AnyAction>,
    void,
    ResponseGenerator & EventChannel<unknown>
> {
    try {
        let response: ResponseGenerator = yield call(
            fetchDepartures,
            request.payload,
        );

        if (response?.data?.departures?.length > 0) {
            const countdown = (): EventChannel<unknown> => {
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
            };

            const channel: EventChannel<unknown> = yield call(countdown);
            yield takeEvery(channel, function* () {
                response = yield call(fetchDepartures, {
                    ...request.payload,
                    poll: true,
                    departureCount: response.data?.departures.length + 1,
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
