import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const DepartureSelector: FunctionComponent<{label: string, value?: MaterialUiPickersDate, handleChange: (date: MaterialUiPickersDate) => void}> = (props) => {
  const { label, value, handleChange } = props;

  const DateContainer = styled(KeyboardDatePicker)`
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid grey;
    margin: 0 10px 0 0;
  `;

  return (
      <DateContainer
          disableToolbar
          variant="inline"
          format="DD/MM/YYYY"
          margin="normal"
          id="date-picker-inline"
          label={label}
          value={value}
          onChange={handleChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
  )
};

export default DepartureSelector;