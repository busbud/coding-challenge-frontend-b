// third-party libraries
import React from 'react';
import { mount } from 'enzyme';

// components
import Search from './index'

describe('NavBar Component', () => {
  it('should be rendered properly', () => {

    const wrapper = mount(<Search />);
    expect(wrapper.find('div').length).toEqual(4);
    expect(wrapper).toMatchSnapshot();
  });
})
