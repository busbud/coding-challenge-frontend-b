import { ActionType, createReducer } from 'typesafe-actions';
import * as actions from './actions';
import { Schedule } from '../../api/schedules';

export interface SchedulesStateType {
    schedules: Schedule[];
    language: string;
}

export const schedulesInitialState: SchedulesStateType = {
    schedules: [],
    language: 'en',
};

export const schedulesReducer = createReducer<
    Readonly<SchedulesStateType>,
    ActionType<typeof actions>
>(schedulesInitialState).handleAction(
    actions.getSchedules.success,
    (state, action) => ({
        ...state,
        schedules: [...action.payload],
    })
);
