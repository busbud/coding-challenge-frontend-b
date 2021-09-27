import React from 'react';
import {Table} from 'antd';
import {IDeparture} from '@src/types';
import {useDepartureSelector} from '@src/redux/selector';
import { DEPARTURE_LIST_COLUMNS } from './DepartureList.constants';
import { DepartureStops } from './departureStops/DepartureStops';

const DepartureList = (): React.ReactElement => {
    const {loading, departures, error} = useDepartureSelector();

    return (
        <Table
            loading={loading}
            columns={DEPARTURE_LIST_COLUMNS}
            dataSource={departures}
            expandable={{
                expandedRowRender: (record: IDeparture) => (
                    <DepartureStops stops={record.stops} />
                ),
                rowExpandable: (record) => record.stops?.length > 0,
            }}
        />
    );
};

export default DepartureList;
