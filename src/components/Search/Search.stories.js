// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Search } from './Search';

import { Fixtures } from '../../domains/search';

storiesOf('Search', module)
  .add('default', () => (
    <Search proposedTrips={Fixtures.proposedTrips} onSearch={action('onSearh')} />
  ))
  .add('without proposed trip', () => <Search proposedTrips={[]} onSearch={action('onSearh')} />);
