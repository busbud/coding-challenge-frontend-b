// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DatePicker } from './DatePicker';

storiesOf('DatePicker', module).add('Default', () => (
  <DatePicker label="label" onChange={action('changed')} />
));
