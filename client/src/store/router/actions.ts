import { push } from 'connected-react-router';
import { createStandardAction } from 'typesafe-actions';

export const findSchedules = createStandardAction('@@router/FIND_SCHEDULES')();
// export const goToDashboard = () => push('/dashboard');
// export const goToPoliticianDashboard = (politicianId: string) =>
//     push(`/dashboard?politician=${politicianId}`);
