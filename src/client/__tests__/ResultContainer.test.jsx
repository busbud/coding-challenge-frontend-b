import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ResultContainer from '../containers/ResultContainer';

describe('testing Card component', () => {
  let wrapper;
  let props = {
    initialSearch: jest.fn(),
    departureDate: '2020-08-20',
    handleDateChange: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<SearchInputForm {...props} />);
    props.handleDateChange.mockClear();
  });

  test("SearchInputForm component should have a outer div with className 'search-input-form'", () => {
    expect(wrapper.hasClass('search-input-form')).toEqual(true);
  });
});
