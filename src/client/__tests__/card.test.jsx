import React from 'react';
import Card from '../components/Card';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { exportAllDeclaration } from '@babel/types';

configure({ adapter: new Adapter() });

describe('testing the Card component', () => {
  let props = {
    cities: [{ id: 1, name: 'new york' }, { id: 2, name: 'montreal' }],
    operators: [{ id: 1, logo_url: 'url' }],
    locations: [{ id: 1, name: 'port authority' }, { id: 2, name: 'montreal bus station' }],
    data: {
      operator_id: 1,
      origin_location_id: 1,
      destination_location_id: 2,
      departure_time: '2020-07-15T07:25:00',
      arrival_time: '2020-07-15T18:05:00',
      prices: { total: 5000 },
    },
  };

  let wrapper = shallow(<Card {...props} />);

  it("Card component should have a outer div with class equal to 'card'", () => {
    expect(wrapper.hasClass('card')).toEqual(true);
  });
});
