import { push } from 'connected-react-router';
import { createStandardAction } from 'typesafe-actions';

export const findSchedules = createStandardAction('@@router/FIND_SCHEDULES')();

export const goToLanguage = (languageId: string) => push(`/${languageId}`);
