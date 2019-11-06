import {
    Action,
    combineReducers,
    createFeatureSelector,
    createSelector
} from '@ngrx/store';
import * as fromRoot from '../../../../state-management/reducers';
import * as fromDepartures from './departures.reducer';
import { departuresFeatureKey } from './departures.reducer';
import * as fromSearchForm from './search-form.reducer';
import { searchFormFeatureKey } from './search-form.reducer';

export const searchModuleFeatureKey = 'search';

export interface SearchState {
    loading: boolean;
    [fromSearchForm.searchFormFeatureKey]: fromSearchForm.State;
    [fromDepartures.departuresFeatureKey]: fromDepartures.State;
}

export interface State extends fromRoot.State {
    [searchModuleFeatureKey]: SearchState;
}

export function reducers(state: SearchState | undefined, action: Action) {
    return combineReducers({
        [fromSearchForm.searchFormFeatureKey]: fromSearchForm.reducer,
        [fromDepartures.departuresFeatureKey]: fromDepartures.reducer
    })(state, action);
}

export const selectSearchModuleState = createFeatureSelector<State, SearchState>(
    searchModuleFeatureKey
);

export const selectSearchFormState = createSelector(
    selectSearchModuleState,
    state => state[searchFormFeatureKey]
);

export const selectDepartureEntitiesState = createSelector(
    selectSearchModuleState,
    state => state[departuresFeatureKey]
);

export const selectSelectedDepartureId = createSelector(
    selectDepartureEntitiesState,
    fromDepartures.selectId
);

export const {
    selectIds: selectDepartureIds,
    selectEntities: selectDepartureEntities,
    selectAll: selectAllDepartures,
    selectTotal: selectTotalDepartures,
} = fromDepartures.adapter.getSelectors(selectDepartureEntitiesState);

export const selectSelectedDeparture = createSelector(
    selectDepartureEntities,
    selectSelectedDepartureId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    }
);

export const getSearchFormSubmittedState = createSelector(
    selectSearchFormState,
    fromSearchForm.getSubmitted
);
export const getSearchFormDataState = createSelector(
    selectSearchFormState,
    fromSearchForm.getData
);
export const getSearchLoadingState = createSelector(
    selectDepartureEntitiesState,
    fromDepartures.selectLoading
);
