// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { TravelerCountSelector } from './Tata';

storiesOf('TravelerCountSelector', module).add('Default', () => (
  <TravelerCountSelector onChange={action('changed')} />
));
