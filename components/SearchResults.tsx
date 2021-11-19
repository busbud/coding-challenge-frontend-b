import React from 'react';
import { useRecoilValue } from 'recoil';
import Box from '@mui/material/Box';
import { departuresFullState } from '../store/states';
import Departure from './Departure';
import { DeparturesFullEntity } from '../interfaces/response';

const SearchResults = () => {
    const departures = useRecoilValue<DeparturesFullEntity[]>(departuresFullState);

    return (
        <Box
            sx={{
                p: 3,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            {
                departures.map(departure => (
                    <Departure key={departure.id} departure={departure} />
                ))
            }
        </Box>
    );
};

export default SearchResults;