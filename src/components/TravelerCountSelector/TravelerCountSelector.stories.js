// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TravelerCountSelector } from './TravelerCountSelector';

storiesOf('TravelerCountSelector', module).add('Default', () => (
  <TravelerCountSelector travellerType="children" onChange={action('changed')} />
));
