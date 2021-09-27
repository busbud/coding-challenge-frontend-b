import React from 'react';
import { Table } from 'antd';
import { useDepartureSelector } from 'src/redux/selector';
import { IDeparture } from 'src/types';

import { DEPARTURE_LIST_COLUMNS } from './DepartureList.constants';
import { DepartureStopList } from './departureStopList/departureStopList';

const DepartureList = (): React.ReactElement => {
    const { loading, departures, error } = useDepartureSelector();

    return (
        <Table
            loading={loading}
            columns={DEPARTURE_LIST_COLUMNS}
            dataSource={departures}
            expandable={{
                expandedRowRender: (record: IDeparture) => (
                    <DepartureStopList stops={record.stops} />
                ),
                rowExpandable: (record) => record.stops?.length > 0,
            }}
        />
    );
};

export default DepartureList;
