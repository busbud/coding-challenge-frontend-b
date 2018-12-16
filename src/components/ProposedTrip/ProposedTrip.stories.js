// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { ProposedTrip } from './ProposedTrip';
import { proposedTrip } from './fixtures/proposedTrip';

storiesOf('ProposedTrip', module).add('default', () => <ProposedTrip {...proposedTrip} />);
