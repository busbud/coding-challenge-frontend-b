import React from 'react';
import IconButton from '@mui/material/IconButton';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import SearchButton from './SearchButton';
import LocationPicker from './LocationPicker';
import DatePicker from './DatePicker';
import { Cities } from '../utils/sample-data';

import { useSearchForm } from '../hooks/useForm';

const SearchForm = () => {
    const {
        values,
        events,
        isValid,
        canSwap,
        cities,
    } = useSearchForm(Cities);
    return (
        <AppBar
            sx={{
                p: 2,
                borderRadius: '8px',
            }}
            position="static"
            color="default"
            elevation={0}
        >
            <Stack
                direction={{ xs: 'column', lg: 'row' }}
                justifyContent={{xs: "center", lg: 'space-around'}}
                alignItems="stretch"
            >
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    justifyContent={{xs: "center", md: 'space-around'}}
                    alignItems="stretch"
                    sx={{
                        flex: 1,
                    }}
                >
                    <LocationPicker
                        city={values.departure}
                        label="Departure"
                        cities={cities.departureCities}
                        onChange={events.onDepartureChange}
                    />
                    <IconButton onClick={events.onCitiesSwap} disabled={!canSwap}>
                        <SwapHorizIcon />
                    </IconButton>
                    <LocationPicker
                        city={values.destination}
                        label="Destination"
                        cities={cities.destinationCities}
                        onChange={events.onDesinationChange}
                    />
                </Stack>

                <Stack
                    direction={{ xs: 'column', lg: 'row' }}
                    justifyContent={{xs: "center", lg: 'space-evenly'}}
                    alignItems="stretch"
                    sx={{
                        '> *': {
                            p: {
                                xs: 2,
                                lg: 0,
                            },
                            pl: {
                                xs: 0,
                                lg: 2,
                            }
                        },
                    }}
                >
                    <DatePicker
                        date={values.date}
                        onChange={events.onDateChange}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <SearchButton
                            isDisabled={!isValid}
                            onClick={events.onSubmit}
                        />
                    </Box>
                </Stack>
            </Stack>
        </AppBar>
    );
};

export default SearchForm;