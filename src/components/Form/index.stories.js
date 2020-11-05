import React from 'react';
import { storyWithThemeToggle } from '../../context/ThemeProvider/storyWithThemeToggle';
import Form from './index';

export default {
  title: 'Form',
  component: Form,
  decorators: [storyWithThemeToggle],
};

export const Default = () => (
  <Form
    onChange={(e) => console.log(e)}
  />
);
