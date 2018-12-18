// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import moment from 'moment';
import numeral from 'numeral';

import {
  Card, CardContent, Typography, CardMedia,
} from '@material-ui/core';
import type { ProposedTrip as ProposedTripType } from '../../types';

type Classes = {|
  proposedTrip: string,
  tripComplementatryInformations: string,
  costInformations: string,
  tripInformations: string,
  timeInformations: string,
  travellersCount: string,
  card: string,
  media: string,
|};

type Props = {|
  classes: Classes,
|};

const styles = {
  proposedTrip: {
    marginBottom: '16px',
  },
  media: {
    width: '120px',
    height: '120px',
    marginBottom: '9px',
  },
  tripInformations: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid',
    paddingBottom: '6px',
  },
  timeInformations: {
    display: 'flex',
  },
  travellersCount: {
    fontSize: 12,
  },
  tripComplementatryInformations: {
    marginTop: '6px',
  },
};

const UnStyledProposedTrip = (props: Props & ProposedTripType) => {
  const {
    classes,
    arrivalTime,
    departureTime,
    totalPrice,
    operator,
    departureLocation,
    travellersCount,
  } = props;

  return (
    <Card className={classes.proposedTrip}>
      <CardContent>
        <CardMedia className={classes.media} image={operator.logoUrl} title="Paella dish" />
        <div className={classes.tripInformations}>
          <div className={classes.timeInformations}>
            <Typography>{moment(arrivalTime).format('LT')}</Typography>
            {'->'}
            <Typography>{moment(departureTime).format('LT')}</Typography>
          </div>
          <div className={classes.costInformations}>
            <Typography variant="subtitle1">{numeral(totalPrice).format('$0.00')}</Typography>
            <Typography className={classes.travellersCount} color="textSecondary">
              {`For ${travellersCount} traveller(s)`}
            </Typography>
          </div>
        </div>
        <div className={classes.tripComplementatryInformations}>
          <Typography>
            <span>From: </span>
            {departureLocation}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export const ProposedTrip = withStyles(styles)(UnStyledProposedTrip);
