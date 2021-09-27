import React, { useMemo } from 'react';
import {Button, Steps} from 'antd';

import { DepartureStop } from '../departureStop/DepartureStop';
import { DepartureStopsProps } from './DepartureStops.types';

const {Step} = Steps;

export const DepartureStops: React.FC<DepartureStopsProps> = ({stops}) => {
    const [current, setCurrent] = React.useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const previous = () => {
        setCurrent(current - 1);
    };

    return (
        <>
            <Steps current={current}>
                {stops.map((item) => (
                    <Step key={item.location} />
                ))}
            </Steps>
            <DepartureStop
                item={stops[current]}
                actions={[
                    <Button
                        disabled={current === 0}
                        type="primary"
                        onClick={() => previous()}
                    >
                        Previous
                    </Button>,
                    <Button
                        disabled={current >= stops.length - 1}
                        type="primary"
                        onClick={() => next()}
                    >
                        Next
                    </Button>,
                ]}
            ></DepartureStop>
        </>
    );
};