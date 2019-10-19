import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResultContainer from '../containers/ResultContainer';
import LoadingCard from '../components/LoadingCard';
import Card from '../components/Card';

configure({ adapter: new Adapter() });

describe('testing ResultContainer', () => {
  let wrapper;
  let props = {
    cities: [],
    operators: [],
    locations: [],
    departures: [{ id: 1 }, { id: 2 }],
    isPollingComplete: false,
    isSearchInitialized: false,
  };

  beforeEach(() => {
    wrapper = shallow(<ResultContainer {...props} />);
  });

  test('Festival schedule should render if search is not initialized', () => {
    expect(wrapper.find('#osheaga-schedule')).toHaveLength(1);
  });

  test('Festival schedule should not render if search is initialized', () => {
    wrapper.setProps({ isSearchInitialized: true });
    expect(wrapper.find('#osheaga-schedule')).toHaveLength(0);
  });

  test('LoadingCard component should render if polling is not complete', () => {
    wrapper.setProps({ isSearchInitialized: true });
    expect(wrapper.find(LoadingCard)).toHaveLength(1);
  });

  test('LoadingCard component should not render if polling is complete', () => {
    wrapper.setProps({ isSearchInitialized: true, isPollingComplete: true });
    expect(wrapper.find(LoadingCard)).toHaveLength(0);
  });

  test('Length of departures prop should be equal to the number of Card components', () => {
    expect(wrapper.find(Card)).toHaveLength(props.departures.length);
  });
});
