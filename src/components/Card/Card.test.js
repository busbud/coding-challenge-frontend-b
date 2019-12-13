// third-party libraries
import React from 'react';
import { mount } from 'enzyme';

// components
import Card from './index'

describe('NavBar Component', () => {
  const props = {
    departure_time: '2020-11-02T11:15:00',
    arrival_time: '2020-11-03T02:55:00',
    total_price: 6550,
    departure_location: { city_name: 'New York', name: 'GW Bridge' },
    arrival_location: { city_name: 'Montreal', name: 'Gare d\'autocars' }

  }
  it('should be rendered properly', () => {

    const wrapper = mount(<Card {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
})
