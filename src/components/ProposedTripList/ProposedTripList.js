// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ProposedTrip } from '../ProposedTrip';

import type { ProposedTrip as ProposedTripType } from '../../types';

type Classes = {|
  proposedTrips: string,
|};

type Props = {|
  classes: Classes,
  proposedTrips: Array<ProposedTripType>,
|};

const styles = {
  proposedTrips: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
};

const UnStyledProposedTripList = (props: Props) => {
  const { proposedTrips, classes } = props;

  const renderProposedTrip = () => proposedTrips.map(proposedtrip => (
    <ProposedTrip
      key={`${proposedtrip.arrivalTime}/${proposedtrip.departureTime}`}
      {...proposedtrip}
    />
  ));

  return (
    <div className={classes.proposedTrips}>
      {' '}
      {proposedTrips.length === 0 ? (
        <Typography variant="subheading">No result found </Typography>
      ) : (
        renderProposedTrip()
      )}
    </div>
  );
};

export const ProposedTripList = withStyles(styles)(UnStyledProposedTripList);
