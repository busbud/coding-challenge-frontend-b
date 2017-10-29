import React from 'react';
import Trip from './Trip';
import createTrip from '../fixtures/createTrip';
import { render } from 'enzyme';

it('renders trip details', () => {
  const trip = render(<Trip trip={createTrip()} />);

  expect(trip.text()).toContain('02:01');
  expect(trip.text()).toContain('4211 Broadway');
  expect(trip.text()).toContain('09:55');
  expect(trip.text()).toContain('Gare d’autocars de Montréal');
  expect(trip.text()).toContain('55,00 $');
});
