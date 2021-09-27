import { AnyAction } from "redux";
import { AllEffect, all, takeLatest } from "redux-saga/effects";
import { FETCH_DEPARTURE_TYPES } from "../actions/actionTypes";
import { fetchDeparturesSaga } from "./departureSaga";

function* departuresSaga(): Generator<AllEffect<AnyAction>> {
    yield all([
        takeLatest(
            FETCH_DEPARTURE_TYPES.FETCH_DEPARTURES_REQUEST,
            fetchDeparturesSaga,
        ),
    ]);
}

export default departuresSaga;
