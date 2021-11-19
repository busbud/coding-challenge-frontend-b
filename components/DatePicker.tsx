import React from 'react';
import DatePickerMaterial from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';

type Prop = {
    date: Dayjs;
    onChange: (date: Dayjs) => void;
};

const DatePicker = ({ date, onChange }: Prop) => (
    <Box
        sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
        }}
    >
        <DatePickerMaterial
            label="Date"
            openTo="day"
            views={['year', 'month', 'day']}
            value={date}
            onChange={onChange}
            renderInput={(params) => <TextField {...params} />}
        />
    </Box>
);

export default DatePicker;