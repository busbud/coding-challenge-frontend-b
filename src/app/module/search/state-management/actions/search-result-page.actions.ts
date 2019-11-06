import {
    createAction,
    props
} from '@ngrx/store';
import { SearchFormQuery } from '../../page/search-form/models/search-form-query.interface';

export const selectDeparture = createAction(
    '[Search Result] Select Departure',
    props<{ id: string }>()
);

export const searchDepartures = createAction(
    '[Search Result] Search Departures',
    props<SearchFormQuery>()
);
