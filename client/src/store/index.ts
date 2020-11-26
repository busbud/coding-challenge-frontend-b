import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';

import { schedulesReducer, SchedulesStateType } from './schedules/reducer';

export interface ApplicationState {
    schedules: SchedulesStateType;
    router?: RouterState;
}

export default (history: History) =>
    combineReducers<ApplicationState>({
        schedules: schedulesReducer,
        router: connectRouter(history),
    });
