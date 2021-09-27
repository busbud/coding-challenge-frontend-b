import moment from 'moment';
import { TIME_FORMAT_LIST } from 'src/constants';

export const compare = (a: string, b: string): number => a.localeCompare(b);
export const numberCompare = (a: number, b: number): number => b - a;
export const dateCompare = (dateA: string, dateB: string): number => {
    return moment(dateA, TIME_FORMAT_LIST).diff(
        moment(dateB, TIME_FORMAT_LIST),
    );
};
