import CustomDatePicker from '@src/components/datePicker/DatePicker';
import {getDefaultDate} from '@src/utils/date';
import {Card, Input, InputNumber, Space} from 'antd';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';

import {fetchDepartures} from '../redux/actions/departure';

const DepartureSearch = (): React.ReactElement => {
    const dispatch = useDispatch();
    const [date, setDate] = useState<string>(getDefaultDate());
    const [origin, setOrigin] = useState<string>('Québec');
    const [destination, setDestination] = useState<string>('Montréal');
    const [passengerCount, setPassengerCount] = useState(1);

    const getDepartures = (params: any) => {
        dispatch(fetchDepartures(params));
    };

    useEffect(() => {
        getDepartures({origin, destination, date, passengerCount });
    }, []);


    return (
        <Card>
            <Space direction="horizontal">
                <Input value={origin} size="large" onChange={(val) =>  getDepartures({origin: val, destination, date, passengerCount })} />
                <Input value={destination} size="large" onChange={(val) =>  getDepartures({origin, destination: val, date, passengerCount })}  />
                <CustomDatePicker
                    date={date}
                    onDateChange={(val: string) => {
                        setDate(val);
                        getDepartures({origin, destination, date: val, passengerCount })
                    }}
                />
                <InputNumber
                    value={passengerCount}
                    size="large"
                    onChange={(val) => {
                        setPassengerCount(val);
                        getDepartures({origin, destination, date, passengerCount: val});
                    }}
                />
            </Space>
        </Card>
    );
};

export default DepartureSearch;
