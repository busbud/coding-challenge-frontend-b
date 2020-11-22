import { FormControl, InputLabel, Select } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Cities } from '../../../main/types';

const CitySelector: FunctionComponent<{value: string, handleChange: (hash: string) => void, label: string, options: Cities[], labelId: string}> = (props) => {
  const { value, handleChange, label, options, labelId } = props;
  if (!options) return null;
  
  let selectedValue; 

  if(value && value !== 'None') {
    selectedValue = options.filter((option) => option.hash === value)[0].hash;
  } else {
    selectedValue = {};
  }
  
  const SelectContainer = styled(Select)`
    background: #fff;
    width: 150px;
    margin-right: 10px;
  `;

  return (
    <FormControl>
      <InputLabel htmlFor={`city-selector-${labelId}`}>{label}</InputLabel>
      <SelectContainer
        variant="outlined"
        value={selectedValue}
        inputProps={{
          name: 'city',
          id: `city-selector-${labelId}`,
        }}
      >
        <option value={'none'} onClick={() => handleChange('None')} key="none">None</option>
        {
          options.map((option: any) =>  <option value={option.hash}  key={option.hash} onClick={() => handleChange(option.hash)}>{option.name}</option>)
        }
      </SelectContainer>
    </FormControl>
  )
};

export default CitySelector;