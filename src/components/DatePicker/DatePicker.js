// @flow
import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import CalendarToday from '@material-ui/icons/CalendarToday';

type Props = {|
  onChange: (value: string) => void,
  label: string,
|};

export const DatePicker = (props: Props) => {
  const { onChange, label } = props;

  return (
    <TextField
      onChange={e => onChange(e.target.value)}
      label={label}
      fullWidth
      type="date"
      defaultValue="2019-08-12"
      variant="outlined"
      InputProps={{
        shrink: true,
        startAdornment: (
          <InputAdornment position="start">
            <CalendarToday />
          </InputAdornment>
        ),
      }}
    />
  );
};
