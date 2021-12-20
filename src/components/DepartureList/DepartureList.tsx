import { useContext } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider
} from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import Store from "app/store";
import { Departure } from 'types';
import { processDate } from 'utils';
import { getRandomColor } from 'utils/fancy';

interface ItemProps {
  departure: Departure;
}

const DepartureItem = ({ departure }: ItemProps): JSX.Element => {
  const start = processDate(departure.start);
  const end = processDate(departure.end);
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: departure.currency,
  });
  const randomTheme = getRandomColor();

  return (
    <Card variant="outlined" sx={{ borderColor: randomTheme.bg }}>
      <Typography sx={{ fontSize: 14, m: 1 }}>
        {departure.location}
      </Typography>
      <Typography variant="h5" sx={{ bgcolor: randomTheme.bg, color: randomTheme.t, p: 2 }}>
        {formatter.format(departure.price)}
      </Typography>
      <CardContent>
        <Box display={'flex'}>
          <Box flex={'auto'} sx={{ p: 1}}>
            <Typography variant="subtitle2">From</Typography>
            <Typography variant="caption">{start.date}</Typography>
            <br /><Typography variant="caption">{start.time}</Typography>
          </Box>
          <Divider orientation="vertical" flexItem/>
          <Box flex={'auto'} sx={{ p: 1}}>
            <Typography variant="subtitle2">To</Typography>
            <Typography variant="caption">{end.date}</Typography>
            <br /><Typography variant="caption">{end.time}</Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{ bgcolor: randomTheme.bg, color: randomTheme.t, pl: 2, pr: 2 }}>Learn More</Button>
      </CardActions>
    </Card>
  )
}

const DepartureList = (): JSX.Element => {
  const { departures, isDirty, isLoading } = useContext(Store);

  if (!isDirty || isLoading) {
    return <></>;
  }

  const items = departures.map((departure, index) => <DepartureItem key={`departure-${index}`} departure={departure} />)

  return (
    <>
      <Typography variant="h2" sx={{ width: 1, p: 2 }}>Results</Typography>
      <Box sx={{ width: 1, p: 2 }}>
        <Masonry columns={3} spacing={1}>
          {items}
        </Masonry>
      </Box>
    </>

    
  )
};

export default DepartureList;