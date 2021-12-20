import { FC, useState } from 'react';
import {
  FormControl,
  FormHelperText,
  Select,
  SelectChangeEvent,
  InputLabel,
  MenuItem
} from '@mui/material';
import { Value } from 'utils/defaultValues';

interface Props {
  label: string;
  options: Array<Value>;
  defaultValue: Value;
  helperText: string;
  onChange: (cityCode: string) => void;
};

// This probably should live as a generic Select component first and then as a common selector for cities
const CitySelect: FC<Props> = ({ label, options, defaultValue, helperText, onChange }): JSX.Element => {
  const [cityValue, setCityValue] = useState(defaultValue);

  const handleChange = (event: SelectChangeEvent) => {
    const selected = options.find(option => option.value === event.target.value);
    if (selected) {
      setCityValue(selected);
      onChange(selected.value);
    }
  };

  const menuOptions = options.map((option, index) => (
    <MenuItem value={option.value} key={index}>
      <em>{option.key}</em>
    </MenuItem>
  ));

  return (
    <FormControl sx={{ width: 1 }} variant="standard">
      <InputLabel id={`${label}-helper-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-helper-label`}
        id={`${label}-helper`}
        value={cityValue.value}
        label={label}
        onChange={handleChange}
      >
        {menuOptions}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default CitySelect;