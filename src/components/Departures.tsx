import { Departure } from '../domain/types';
import DepartureCard from './DepartureCard';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useTranslation } from 'react-i18next';

const sortByCheapest = (a: Departure, b: Departure) => {
  return a.price - b.price;
};

interface Props {
  departures: Departure[];
}

export function Departures({ departures }: Props): JSX.Element {
  const { t } = useTranslation('common');
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      width={{ xs: '100%', md: '50%' }}
      p={3}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        width="100%"
        pt={2}
        pb={1}
      >
        <Typography variant="h6">
          {departures.length} {t('departuresFound')}
        </Typography>
        <Chip label={t('cheapest')} />
      </Stack>

      {departures.sort(sortByCheapest).map((departure: Departure) => (
        <DepartureCard key={departure.id} departure={departure} />
      ))}
    </Stack>
  );
}
