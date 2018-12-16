// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { ProposedTripList } from './ProposedTripList';
import { proposedTripList } from './fixtures/proposedTripList';

storiesOf('ProposedTripList', module).add('default', () => (
  <ProposedTripList proposedTrips={proposedTripList} />
));
