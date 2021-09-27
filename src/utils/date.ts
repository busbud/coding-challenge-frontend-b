import moment from 'moment';
import { DATE_FORMAT_LIST, TIME_FORMAT_LIST } from 'src/constants';

export const getDefaultDate = (): string => moment().format(DATE_FORMAT_LIST);

export const getTime = (date: string): string | undefined =>
    date ? moment(date).format(TIME_FORMAT_LIST) : undefined;
