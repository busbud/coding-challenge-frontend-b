// @flow
import React from 'react';
import { TextField, InputAdornment } from '@material-ui/core';
import CalendarToday from '@material-ui/icons/CalendarToday';

type Props = {|
  onChange: (value: string) => void,
  label: string,
  isErrored: boolean,
|};

export const DatePicker = (props: Props) => {
  const { onChange, label, isErrored } = props;

  return (
    <TextField
      onChange={e => onChange(e.target.value)}
      label={label}
      fullWidth
      error={isErrored}
      type="date"
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
