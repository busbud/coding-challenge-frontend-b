import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const CityPicker = props => (
    <Select
        value={props.value}
        onChange={props.onChange}
        name={props.name}>
        {props.cities.map(city => (
            <MenuItem key={city.id} value={city.geohash}>{city.name}</MenuItem>
        ))}
    </Select>
);

CityPicker.propTypes = {
    cities: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string,
  };

export default CityPicker;
