import React from 'react';
import { storyWithThemeToggle } from '../../context/ThemeProvider/storyWithThemeToggle';

import StopsList from './index';

export default {
  title: 'StopsList',
  component: StopsList,
  decorators: [storyWithThemeToggle],
};


export const BasicUsage = () => (
  <StopsList
    stops={[
      {
        arrival_time: null,
        departure_operator_id: null,
        departure_time: '2020-12-01T10:30:00',
        name: 'Québec (centre-ville)',
      },
      {
        arrival_time: '2020-12-01T11:00:00',
        departure_operator_id: null,
        departure_time: '2020-12-01T11:00:00',
        name: 'Québec (Sainte-Foy)',
      },
      {
        arrival_time: '2020-12-01T12:15:00',
        departure_operator_id: null,
        departure_time: '2020-12-01T12:30:00',
        name: 'Trois-Rivières',
      },
      {
        arrival_time: '2020-12-01T14:15:00',
        departure_operator_id: null,
        departure_time: null,
        name: 'Montréal (centre-ville)',
      },
    ]}
  />
);
