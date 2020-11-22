import { FormControl, InputLabel, Select } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const PassengersSelector: FunctionComponent<{value: number, handleChange: (e: object) => void, options: number[]}> = (props) => {
  const { value, handleChange, options } = props;
  const { t } = useTranslation();

  if (!options) return null;
  
  const SelectContainer = styled(Select)`
    background: #fff;
    width: 80px;
    margin-right: 10px;
  `;

  return (
    <FormControl>
      <InputLabel htmlFor={'passengers'}>{t('search.passengers.label')}</InputLabel>
      <SelectContainer
        variant="outlined"
        value={value}
        inputProps={{
          name: 'passengers',
          id: 'passengers',
        }}
      >
        <option value={'none'} onClick={handleChange} key="none">None</option>
        {
          options.map((quantity: number) =>  <option value={quantity}  key={quantity} onClick={handleChange}>{quantity}</option>)
        }
      </SelectContainer>
    </FormControl>
  )
};

export default PassengersSelector;