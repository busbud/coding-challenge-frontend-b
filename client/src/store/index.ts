import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';

import { schedulesReducer, SchedulesStateType } from './schedules/reducer';
import { languageReducer, LanguageStateType } from './language/reducer';

export interface ApplicationState {
    schedules: SchedulesStateType;
    language: LanguageStateType;
    router?: RouterState;
}

export default (history: History) =>
    combineReducers<ApplicationState>({
        schedules: schedulesReducer,
        language: languageReducer,
        router: connectRouter(history),
    });
