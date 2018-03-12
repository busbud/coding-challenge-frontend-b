import React from 'react';
import { array, object } from 'prop-types';
import { compareAsc } from 'date-fns';
import { map, compose, sortWith, path, ascend } from 'ramda';
import Grid from 'material-ui/Grid';
import Trip from '../../components/Trip';

const propTypes = {
  classes: object.isRequired,
  cities: array,
  departures: array,
};

const makeTip = ({ id, ...props }) => <Trip key={id} {...props} />;

const departureTimeASC = (a, b) => compareAsc(new Date(a.departure_time), new Date(b.departure_time));
const priceASC = ascend(path(['prices', 'total']));

const mapTrip = compose(map(makeTip), sortWith([departureTimeASC, priceASC]));

const Component = ({ classes, departures }) => (
  <Grid container className={classes.root}>
    {mapTrip(departures)}
  </Grid>
);

Component.propTypes = propTypes;

export default Component;
