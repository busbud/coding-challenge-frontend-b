// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import {
  Card, CardActions, CardContent, Button, Typography,
} from '@material-ui/core';

import type { ProposedTrip as ProposedTripType } from './types';

type Classes = {|
  card: string,
  bullet: string,
  title: string,
  pos: string,
|};

type Props = {|
  classes: Classes,
|};

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const UnStyledProposedTrip = (props: Props & ProposedTripType) => {
  const {
    classes, arrivalTime, departureTime, totalPrice, operatorName,
  } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Word of the Day
        </Typography>
        <Typography variant="h5" component="h2">
          be
          {bull}
          nev
          {bull}
o
          {bull}
          lent
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export const ProposedTrip = withStyles(styles)(UnStyledProposedTrip);
