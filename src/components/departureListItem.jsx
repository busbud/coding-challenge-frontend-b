import React from 'react';
import { makeStyles, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  margin10: {
    margin: 10,
  },
}));

const DepartureListItem = props => {
  const { departure } = props;

  const classes = useStyles();

  return (
    <Grid container spacing={2} justify="center" alignItems="center">
      <Grid item xs={12} lg={3}>
        <img
          className={classes.margin10}
          alt={departure.id}
          src={departure.operatorLogo}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography variant="h6">
          {departure.originLocationName}
        </Typography>
        <Typography color="secondary" variant="subtitle1">
          {departure.departureTime}
        </Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography variant="h6">
          {departure.destinationLocationName}
        </Typography>
        <Typography color="secondary" variant="subtitle1">
          {departure.arrivalTime}
        </Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography variant="h6">Price:</Typography>
        <Typography color="secondary" variant="subtitle1">
          {departure.priceDetail}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DepartureListItem;
