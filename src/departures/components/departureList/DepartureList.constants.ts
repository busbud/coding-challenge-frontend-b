/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { ColumnType } from 'antd/lib/table';
import type { IDeparture } from 'src/types';
import { compare, dateCompare, numberCompare } from 'src/utils/compare';

export const DEPARTURE_LIST_COLUMNS: ColumnType<IDeparture>[] = [
    {
        title: 'Departure Time',
        dataIndex: 'departureTime',
        key: 'departureTime',
        sorter: (a, b) => dateCompare(a.departureTime, b.departureTime),
    },
    {
        title: 'Arrival Time',
        dataIndex: 'arrivalTime',
        key: 'arrivalTime',
        sorter: (a, b) => dateCompare(a.arrivalTime, b.arrivalTime),
    },
    {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        sorter: (a, b) => compare(a.location, b.location),
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        sorter: (a, b) => numberCompare(a.price, b.price),
    },
];
