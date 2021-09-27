import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { DATE_FORMAT_LIST } from 'src/constants';

import styles from './DatePicker.styles.scss';
import type { DatePickerProps, DateType } from './DatePicker.types';
import { disabledDate } from './DatePicker.utils';

const CustomDatePicker: React.FC<DatePickerProps> = ({
    date,
    onDateChange,
}): React.ReactElement => {
    const onChange = (value: DateType) => {
        onDateChange(value?.format(DATE_FORMAT_LIST));
    };

    return (
        <DatePicker
            className={styles.datePicker}
            size="large"
            format={DATE_FORMAT_LIST}
            disabledDate={disabledDate}
            onChange={onChange}
            value={moment(date)}
        />
    );
};

export default CustomDatePicker;
