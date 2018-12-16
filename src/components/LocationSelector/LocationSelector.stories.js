// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { LocationSelector } from './LocationSelector';

import { suggestions } from './fixtures/arrival-fixture';

storiesOf('LocationSelector', module)
  .add('With Results', () => (
    <LocationSelector suggestions={suggestions} label="label" onChange={action('onChange')} />
  ))
  .add('Without Results', () => (
    <LocationSelector suggestions={[]} label="label" onChange={action('onChange')} />
  ));
