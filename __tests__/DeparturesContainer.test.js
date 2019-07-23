import React from 'react';
import { shallow } from 'enzyme';
import DeparturesContainer from '../src/containers/DeparturesContainer';
import DepartureInfo from '../src/components/DepartureInfo';

jest.mock('../src/services/fetch-departures-service', () => ({
  fetchDepartures: () => ({
    complete: true,
    departures: [
      {
        busbud_departure_id: 1,
        departureTime: '10:00',
        arrivalTime: '14:00',
        price: '6800',
      },
      {
        busbud_departure_id: 2,
        departureTime: '11:00',
        arrivalTime: '13:00',
        price: '6200',
      },
    ],
    locations: [
      {
        id: 1,
        name: 'Station A',
      },
      {
        id: 1,
        name: 'Station B',
      },
    ],
  }),
}));

jest.mock('../src/services/attribute-service', () => ({
  getCurrentLanguage: () => 'EN',
}));

describe.only('Departures container', function() {
  beforeEach(() => {
    this.wrapper = shallow(<DeparturesContainer />);
  });

  test('renders', () => {
    expect(this.wrapper.exists()).toBe(true);
  });

  test('should update departures state when component did mount', () => {
    expect(this.wrapper.state().data.departures).toHaveLength(2);
    expect(this.wrapper.state().data.locations).toHaveLength(2);
    expect(this.wrapper.state().data.departures[1].price).toEqual('6200');
  });

  test('should render DepartureInfo component when departures state is updated', () => {
    expect(this.wrapper.children(DepartureInfo).length).toEqual(2);
  });
});
