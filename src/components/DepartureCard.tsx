import { Departure } from '../domain/types';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  departure: Departure;
}
const DepartureCard = ({ departure }: Props): JSX.Element => {
  const { operator, origin, arrival, availableSeats, price, currency } =
    departure;

  const { t } = useTranslation('common');

  return (
    <Stack
      direction="column"
      gap={1}
      p={2}
      my={1}
      boxShadow={5}
      borderRadius={1}
      width="100%"
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" fontWeight={700}>
          {operator}
        </Typography>
        <Typography variant="h6" fontWeight={700} color="primary.light">
          {price}$ - {currency}
        </Typography>
      </Stack>

      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
      >
        <FlightTakeoffIcon sx={{ color: 'primary.light' }} />
        <span>{format(origin.time, 'HH:mm')}</span>
        <span>{origin.city}</span>
        {!!origin.location && <span>- {origin.location}</span>}
      </Stack>

      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        gap={1}
      >
        <FlightLandIcon sx={{ color: 'success.main' }} />
        <span>{format(arrival.time, 'HH:mm')}</span>
        <span>{arrival.city}</span>
        {!!arrival.location && <span> - {arrival.location}</span>}
      </Stack>

      <Stack direction="row" justifyContent="flex-end" alignItems="flex-end">
        {availableSeats > 0 ? (
          <Button variant="contained" size="small" color="secondary">
            {t('bookIt')}
          </Button>
        ) : (
          <Button variant="contained" size="small" color="inherit" disabled>
            {t('soldOut')}
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default DepartureCard;
