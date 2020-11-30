import { createAsyncAction, createStandardAction } from 'typesafe-actions';
import { Schedules, SearchCriteria } from '../../api/interfaces';

export const getSchedules = createAsyncAction(
    '@@schedules/GET-SCHEDULES-REQUEST',
    '@@schedules/GET-SCHEDULES-SUCCESS',
    '@@schedules/GET-SCHEDULES-FAILED'
)<SearchCriteria, Schedules, Error>();
