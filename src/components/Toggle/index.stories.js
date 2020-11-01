import React from 'react';
import { storyWithThemeToggle } from '../../context/ThemeProvider/storyWithThemeToggle';

import Toggle from './index';

export default {
  title: 'Toggle',
  component: Toggle,
  decorators: [storyWithThemeToggle],
  argTypes: {
    checked: { control: { type: 'boolean' }, defaultValue: { value: false } },
  },
};

export const DefaultToggle = () => (
  <Toggle />
);

export const ControlledToggle = (args) => (
  <Toggle
    {...args}
  />
);
