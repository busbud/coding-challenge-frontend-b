import React from 'react';
import { storyWithThemeToggle } from '../../context/ThemeProvider/storyWithThemeToggle';
import ResultCard from './index';

export default {
  title: 'ResultCard',
  component: ResultCard,
  decorators: [storyWithThemeToggle],
};

export const Default = () => (
  <ResultCard
    tripPrice={{
      currency: 'CAD',
      total: 6869,
      categories: {
        adult: 5870,
      },
      discount: 0,
      roundtrip_min: null,
      roundtrip_min_fees_included: null,
      roundtrip_total: null,
      roundtrip_total_fees_included: null,
      discounted: null,
      breakdown: {
        base: 5870,
        fees: 119,
        taxes: 880,
        discount: 0,
      },
    }}
    departureTime={new Date().toISOString()}
    tripDuration={195}
    operator={{ name: 'Orléans Express' }}
    stops={
        [
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
        ]
    }
    amenities={{
      ac: true,
      average_seat: true,
      bus_attendant: false,
      carpool: false,
      display_name: 'Flex',
      food: false,
      full_recline_seat: false,
      hot_meal: false,
      leg_room: true,
      power_outlets: true,
      refreshment: false,
      small_seat: false,
      toilet: true,
      tv: false,
      wifi: false,
      xl_seat: false,
    }}
  />
);
