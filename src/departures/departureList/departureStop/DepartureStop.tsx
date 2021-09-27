import React from 'react';
import { Card } from 'antd';
import { DepartureStopProps } from './DepartureStop.types';

export const DepartureStop: React.FC<DepartureStopProps> = ({ item, actions }) => {
    return (
        <Card title={item.location} actions={actions}>
            {item.departureTime && (
                <Card.Meta
                    title="Destination time"
                    description={item.departureTime} />
            )}
            {item.arrivalTime && (
                <Card.Meta title="Arrival time" description={item.arrivalTime} />
            )}
        </Card>
    );
};
