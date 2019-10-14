import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import WifiIcon from '@material-ui/icons/Wifi';
import ToiletIcon from '@material-ui/icons/Wc';
import AcIcon from '@material-ui/icons/AcUnit';
import RefreshmentIcon from '@material-ui/icons/FreeBreakfast';
import TvIcon from '@material-ui/icons/Tv';
import PowerIcon from '@material-ui/icons/Power';
const DepartureDetails = props => {
  const { departure } = props;
  return (
    <Grid container>
      <Grid item xs={12} md={3}>
        <Typography variant="h6">Amenties</Typography>
        {departure.wifi && <WifiIcon></WifiIcon>}
        {departure.toilet && <ToiletIcon></ToiletIcon>}
        {departure.ac && <AcIcon></AcIcon>}
        {departure.refreshment && <RefreshmentIcon></RefreshmentIcon>}
        {departure.power && <PowerIcon />}
        {departure.tv && <TvIcon />}
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography variant="h6">Seats Available</Typography>
        <Typography color="secondary" variant="subtitle1">
          {departure.availableSeats}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DepartureDetails;
