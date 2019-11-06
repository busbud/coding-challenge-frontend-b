import { SearchFormQuery } from '../../page/search-form/models/search-form-query.interface';
import {
    SearchFormActions,
    SearchFormApiActions
} from '../actions';
import { createReducer, on } from '@ngrx/store';

export const searchFormFeatureKey = 'form';

export interface State {
    submitted: boolean;
    data: SearchFormQuery;
}

const initialState: State = {
    submitted: false,
    data: {
        departure: null,
        arrival: null,
        outboundDate: null,
        seniors: 0,
        adults: 0,
        children: 0
    }
};

export const getSubmitted = (state: State) => state.submitted;
export const getData = (state: State) => state.data;

export const reducer = createReducer(
    initialState,
    on(
        SearchFormActions.openForm,
        SearchFormApiActions.formReset,
        (state) => {
        return {
            ...initialState,
            data: {
                ...initialState.data
            }
        };
    }),
    on(SearchFormApiActions.formSubmitted, (state, { submitted, data }) => ({
        submitted,
        data: {
            ...data
        }
    }))
);
