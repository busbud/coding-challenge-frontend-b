import React from 'react';
import SearchList from '../containers/searchList.js';
import SearchBox from '../components/searchBox.js';
import { shallow } from '../../setupTests';

jest.mock('../utils/api.js');

const testTripInfo = {
  locations: [
    { id: 1, name: 'park', address: ['street', 'the city'] },
    { id: 2, name: 'pool', address: ['road', 'the town'] },
  ],
  departures: [{
    prices: { total: 2700 },
    arrivalTime: '2018-04-27T18:55:00',
    departureTime: '2018-04-27T14:55:00',
    originLocationId: 1,
    destinationLocationId: 2,
    operatorId: 'x',
    id: 'a',
  }],
  operators: [{ id: 'x', displayName: 'Coach Operator' }],
  complete: true
};

describe('SearchList container', () => {
  test('renders', () => {
    const wrapper = shallow(<SearchList />);
    expect(wrapper.exists()).toBe(true);
  });

  test('should render SearchBox component', () => {
    const wrapper = shallow(<SearchList />);
    expect(wrapper.find(SearchBox).length).toBe(1);
  });

  test('should call clickSearch function after click button', () => {
    const clickSearch = jest.fn();
    const searchBox = shallow(<SearchBox clickSearch={clickSearch} />);

    searchBox.find('.searchBox__button').props().onClick();
    expect(clickSearch).toBeCalled();
  });

  test('should update state searchReslt when call function clickSearch', async () => {
    const wrapper = shallow(<SearchList />);

    await wrapper.instance().clickSearch();
    await wrapper.update();
    expect(wrapper.state().searchResult).toEqual(testTripInfo)
  });
});
