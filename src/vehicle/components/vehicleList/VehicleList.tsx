import { List, Pagination } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useVehicleSelector } from 'src/redux/selector';
import { IVehicle } from 'src/types';

import { PAGE_SIZE } from '../vehicle.constants';
import { onPaginate } from './VehicleList.utils';
import { Vehicle } from './vehicleListItem/VehicleListItem';

const VehicleList = (): React.ReactElement => {
    const dispatch = useDispatch();
    const { vehicles, loading } = useVehicleSelector();

    return (
        <>
           {!loading && <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: onPaginate(dispatch),
                    pageSize: PAGE_SIZE,
                }}
                dataSource={vehicles}
                renderItem={(item: IVehicle) => <Vehicle item={item} />}
            />}
        </>
    );
};

export default VehicleList;
