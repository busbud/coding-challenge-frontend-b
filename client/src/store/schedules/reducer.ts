import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { Schedules, SearchCriteria } from '../../api/interfaces';

export interface SchedulesStateType {
    schedules: Schedules;
    loading: boolean;
    searchCriteria: SearchCriteria;
}

export const schedulesInitialState: SchedulesStateType = {
    schedules: {},
    loading: false,
    searchCriteria: {},
};

export const schedulesReducer = createReducer<
    Readonly<SchedulesStateType>,
    ActionType<typeof actions>
>(schedulesInitialState)
    .handleAction(actions.getSchedules.request, (state, action) => ({
        ...state,
        loading: true,
        searchCriteria: action.payload,
    }))
    .handleAction(actions.getSchedules.success, (state, action) => ({
        ...state,
        loading: !action.payload?.complete,
        schedules: { ...action.payload },
    }));
