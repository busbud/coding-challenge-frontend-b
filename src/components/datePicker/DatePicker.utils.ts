import moment from 'moment';
import type { DateType } from './DatePicker.types';

export const disabledDate = (current: DateType): boolean => {
    return current && current < moment().add(-1, 'days' );
};

export const getDateValue = (date?: string): DateType | null => date ? moment(date) : null;
