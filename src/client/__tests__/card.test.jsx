import React from 'react';
import Card from '../components/Card';
import { configure, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('testing Card component', () => {
  let props = {
    cities: [{ id: 1, name: 'New York' }, { id: 2, name: 'Montreal' }],
    operators: [{ id: 1, logo_url: 'http://www.operator.com' }],
    locations: [{ id: 1, name: 'Port Authority' }, { id: 2, name: "Gare d'autocars" }],
    data: {
      operator_id: 1,
      origin_location_id: 1,
      destination_location_id: 2,
      departure_time: '2020-07-15T07:00:00',
      arrival_time: '2020-07-15T18:05:00',
      prices: { total: 5000 },
    },
  };

  let wrapper = shallow(<Card {...props} />);

  test("Card component should have a outer div with className equal to 'card'", () => {
    expect(wrapper.hasClass('card')).toEqual(true);
  });

  test("Card component should have three inner divs with classNames: 'card-top', 'card-middle', 'card-bottom'", () => {
    expect(wrapper.find('.card-top')).toHaveLength(1);
    expect(wrapper.find('.card-middle')).toHaveLength(1);
    expect(wrapper.find('.card-bottom')).toHaveLength(1);
  });

  test('img element should have a property src with the given url from the props', () => {
    expect(wrapper.find('.card-operator-logo').props().src).toEqual('http://www.operator.com');
  });

  test("p element with className 'card-price' should display properly formatted bus price", () => {
    expect(wrapper.find('.card-price').text()).toEqual('$ 50');
  });

  test("p element with classname 'card-departure' should display correct departure info from props", () => {
    expect(wrapper.find('.card-departure').text()).toEqual('7:00 AM New York - Port Authority');
  });

  test("p element with classname 'card-arrival' should display correct arrival info from props", () => {
    expect(wrapper.find('.card-arrival').text()).toEqual("6:05 PM Montreal - Gare d'autocars");
  });

  test("p element with classname 'card-duration' should display correct duration time", () => {
    expect(wrapper.find('.card-duration').text()).toEqual('11h 5m');
  });
});
