import type { Dispatch } from 'react';
import type { AnyAction } from 'redux';
import { fetchDepartures } from 'src/departures/redux/actions/departure';
import type { FetchDeparturesRequestPayload } from 'src/departures/redux/types';

export const getDepartures = (
    params: FetchDeparturesRequestPayload,
    dispatch: Dispatch<AnyAction>,
): void => {
    dispatch(fetchDepartures(params));
};
