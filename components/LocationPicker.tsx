import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

import { City } from '../interfaces'

type Props = {
    city: City | null;
    cities: City[];
    label: string;
    onChange: (city: City) => void;
}
/**
 * Controlled Autocomplete input
 */
const LocationPicker = ({ cities, label = 'City', onChange, city }: Props) => {
    return (
        <Box sx={{ flex: 1 }}>
            <Autocomplete
                value={city}
                disablePortal
                id="combo-box-demo"
                options={cities}
                onChange={(_event, newCity: City | null) => onChange(newCity)}
                sx={{
                    width: '100%',
                }}
                renderInput={(params) => <TextField {...params} label={label} />}
            />
        </Box>
    );
};

export default LocationPicker;