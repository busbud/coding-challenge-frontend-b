import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { Schedules } from '../../api/interfaces';

export interface SchedulesStateType {
    schedules: Schedules;
    loading: boolean;
}

export const schedulesInitialState: SchedulesStateType = {
    schedules: {},
    loading: false,
};

export const schedulesReducer = createReducer<
    Readonly<SchedulesStateType>,
    ActionType<typeof actions>
>(schedulesInitialState).handleAction(
    actions.getSchedules.success,
    (state, action) => ({
        ...state,
        schedules: { ...action.payload },
    })
);
