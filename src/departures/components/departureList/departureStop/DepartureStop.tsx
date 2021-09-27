import React from 'react';
import { Card } from 'antd';

import { ARRIVAL_TIME, DEPARTURE_TIME } from './DepartureStop.constants';
import { DepartureStopProps } from './DepartureStop.types';

export const DepartureStop: React.FC<DepartureStopProps> = ({
    item,
    actions,
}) => {
    return (
        <Card title={item.location} actions={actions}>
            {item.departureTime && (
                <Card.Meta
                    title={DEPARTURE_TIME}
                    description={item.departureTime}
                />
            )}
            {item.arrivalTime && (
                <Card.Meta
                    style={{ marginTop: 10 }}
                    title={ARRIVAL_TIME}
                    description={item.arrivalTime}
                />
            )}
        </Card>
    );
};
