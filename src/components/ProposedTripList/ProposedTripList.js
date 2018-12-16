// @flow
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
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

  return <div className={classes.proposedTrips}>{renderProposedTrip()}</div>;
};

export const ProposedTripList = withStyles(styles)(UnStyledProposedTripList);
