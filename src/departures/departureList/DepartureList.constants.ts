import moment from 'moment';


const dateSort = (dateA: string, dateB: string): number => moment(dateA).diff(moment(dateB));

const defaultSort = (a: number|string, b: number|string): number => {
  if (a < b) return -1;
  if (b < a) return 1;
  return 0;
};

export const Sorter = {
    DEFAULT: defaultSort,
    DATE: dateSort,
  };


export const DEPARTURE_LIST_COLUMNS: any [] = [
    {
        title: 'Departure Time',
        dataIndex: 'departureTime',
        key: 'departureTime',
        sorter: Sorter.DATE,
    },
    {
        title: 'Arrival Time',
        dataIndex: 'arrivalTime',
        key: 'arrivalTime',
        sorter: Sorter.DATE,
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        filterSearch: true,
        showFilter: true,
        onFilter: (value: string, record: { location: string | string[]; }): boolean => record.location.includes(value),
        sorter: Sorter.DEFAULT

    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: Sorter.DEFAULT
    },
];
