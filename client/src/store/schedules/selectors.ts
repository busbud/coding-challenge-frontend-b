import { ApplicationState } from '..';

export const selectSchedulesFromState = (state: ApplicationState) =>
    state.schedules;
