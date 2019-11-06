import { Departure } from '@data/schema/departure';
import {
    createEntityAdapter,
    EntityAdapter,
    EntityState
} from '@ngrx/entity';
import {
    createReducer,
    on
} from '@ngrx/store';
import {
    DeparturesApiActions,
    SearchResultActions
} from '../actions';

export const departuresFeatureKey = 'departures';

export interface State extends EntityState<Departure> {
    selectedDepartureId: string | null;
    loading: boolean;
    error: string;
}

export const adapter: EntityAdapter<Departure> = createEntityAdapter<Departure>({
    selectId: (departure: Departure) => departure.id,
    sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
    selectedDepartureId: null,
    loading: false,
    error: ''
});

export const selectId = (state: State) => state.selectedDepartureId;
export const selectLoading = (state: State) => state.loading;

export const reducer = createReducer(
    initialState,
    on(
        DeparturesApiActions.searchSuccess,
        (state, { departures }) => adapter.addMany(departures, {
            ...state,
            loading: false
        })
    ),
    on(SearchResultActions.selectDeparture, (state, { id }) => ({
        ...state,
        selectedDepartureId: id,
    })),
    on(SearchResultActions.searchDepartures, (state) => ({
        ...state,
        loading: true,
    })),
    on(DeparturesApiActions.searchFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);
