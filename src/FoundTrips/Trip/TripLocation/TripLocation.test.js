import React from 'react';
import TripLocation from './TripLocation';
import { render, shallow } from 'enzyme';
import { Grid } from 'semantic-ui-react';

it('renders trip location', () => {
  const tripLocation = render(<TripLocation location={createLocation()} />);

  expect(tripLocation.text()).toContain('4211 Broadway');
  expect(tripLocation.text()).toContain('02:01');
});

it('renders trip location with given class name', () => {
  const tripLocation = shallow(
    <TripLocation location={createLocation()} className="text-primary" />
  );

  expect(tripLocation.find(Grid)).toHaveProp('className', 'text-primary');
});

it('renders trip location time with given class name', () => {
  const tripLocation = shallow(
    <TripLocation location={createLocation()} timeClassName="text-large" />
  );

  expect(
    tripLocation
      .find(Grid.Column)
      .at(0)
      .prop('className')
  ).toContain('text-large');
});

function createLocation() {
  return {
    name: '4211 Broadway',
    time: '2016-01-14T02:01:00'
  };
}
