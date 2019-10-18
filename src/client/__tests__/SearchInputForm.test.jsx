import React from 'react';
import SearchInputForm from '../components/SearchInputForm';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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

  test("SearchInputForm component should have 4 inner divs with className 'form-input'", () => {
    expect(wrapper.find('.form-input')).toHaveLength(4);
  });

  test('handleDateChange should be invoked when change is simulated on the input element', () => {
    let event = { target: { alue: '2022-08-20' } };
    wrapper.find('#date-input').simulate('change', event);

    expect(props.handleDateChange.mock.calls.length).toBe(1);
  });

  test('initialSearch should be invoked when search button is clicked', () => {
    wrapper.find('.search-button').simulate('click');

    expect(props.initialSearch.mock.calls.length).toBe(1);
  });
});
