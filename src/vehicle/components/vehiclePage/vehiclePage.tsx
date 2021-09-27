import { Col, Row, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useVehicleSelector } from 'src/redux/selector';
import { fetchVehicles } from 'src/vehicle/redux/actions/vehicle';

import VehicleList from '../vehicleList/VehicleList';
import VehicleMap from '../vehicleMap/VehicleMap';

const VehiclePage = (): React.ReactElement => {
    const dispatch = useDispatch();
    const { loading } = useVehicleSelector();

    useEffect(() => {
        dispatch(fetchVehicles());
    }, []);

    return (
        <Spin spinning={loading}>
            <Row>
                <Col span={10}>
                    <VehicleList />
                </Col>
                <Col span={14}>
                    <VehicleMap />
                </Col>
            </Row>
        </Spin>
    );
};

export default VehiclePage;
