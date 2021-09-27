import { useSelector } from 'react-redux';
import type { DeparturesState } from 'src/departures/redux/types';

import { Reducers } from './constants';
import type { RootState } from './reducer';

export const useDepartureSelector = (): DeparturesState =>
    useSelector((state: RootState) => state[Reducers.DEPARTURE_REDUCER]);
