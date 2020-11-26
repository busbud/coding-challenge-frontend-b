import { createAsyncAction, createStandardAction } from 'typesafe-actions';
import { Schedule } from '../../api/schedules';

// export const init = createStandardAction('@@schedules/INIT')();

export const getSchedules = createAsyncAction(
    '@@schedules/GET-SCHEDULES-REQUEST',
    '@@schedules/GET-SCHEDULES-SUCCESS',
    '@@schedules/GET-SCHEDULES-FAILED'
)<string, Schedule[], Error>();
