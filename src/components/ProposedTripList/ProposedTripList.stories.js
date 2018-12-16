// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { ProposedTripList } from './ProposedTripList';
import { proposedTripList } from './fixtures/proposedTripList';

storiesOf('ProposedTripList', module)
  .add('with Results', () => <ProposedTripList proposedTrips={proposedTripList} />)
  .add('without Result', () => <ProposedTripList proposedTrips={[]} />);
