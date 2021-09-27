import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Input, InputNumber, Space } from 'antd';
import CustomDatePicker from 'src/components/datePicker/DatePicker';
import { getDefaultDate } from 'src/utils/date';

import { getDepartures } from './DepartureSearch.utils';

const DepartureSearch = (): React.ReactElement => {
    const dispatch = useDispatch();
    const [date, setDate] = useState<string>(getDefaultDate());
    const [origin, setOrigin] = useState<string>('Québec');
    const [destination, setDestination] = useState<string>('Montréal');
    const [passengerCount, setPassengerCount] = useState(1);

    useEffect(() => {
        getDepartures({ origin, destination, date, passengerCount }, dispatch);
    }, []);

    useEffect(() => {
        getDepartures(
            {
                origin,
                destination,
                date,
                passengerCount,
            },
            dispatch,
        );
    }, [date, origin, destination, passengerCount]);

    return (
        <Card>
            <Space direction="horizontal">
                <Input
                    value={origin}
                    size="large"
                    onChange={(val) => setOrigin(val.target.value)}
                />
                <Input
                    value={destination}
                    size="large"
                    onChange={(val) => setDestination(val.target.value)}
                />
                <CustomDatePicker
                    date={date}
                    onDateChange={(val: string) => {
                        setDate(val);
                    }}
                />
                <InputNumber
                    min={1}
                    value={passengerCount}
                    size="large"
                    onChange={(val) => {
                        setPassengerCount(val);
                    }}
                />
            </Space>
        </Card>
    );
};

export default DepartureSearch;
