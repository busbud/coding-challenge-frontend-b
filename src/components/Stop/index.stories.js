import React from 'react';
import { storyWithThemeToggle } from '../../context/ThemeProvider/storyWithThemeToggle';
import Stop from './index';

export default {
  title: 'Stop',
  component: Stop,
  decorators: [storyWithThemeToggle],
};

const now = new Date();

export const Default = () => (
  <Stop
    time={now}
    stopName="Montréal"
  />
);
export const isFirstOfRoute = () => (
  <Stop
    time={now}
    stopName="Montréal"
    isFirstOfRoute
  />
);
export const isLastOfRoute = () => (
  <Stop
    time={now}
    stopName="Montréal"
    isLastOfRoute
  />
);
