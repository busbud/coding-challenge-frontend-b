import { createAction, union, props } from '@ngrx/store';

import * as fromSearchForm from '../reducers/search-form.reducer';

export const formSubmitted = createAction(
    '[Search Form/API] Form Submitted',
    props<fromSearchForm.State>()
);

export const formReset = createAction('[Search Form/API] Form Reset');
