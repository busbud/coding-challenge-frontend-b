import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DatePicker } from './DatePicker';

storiesOf('Button', module).add('Default', () => <DatePicker onClick={action('clicked')} />);
