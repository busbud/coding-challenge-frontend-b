// third-party libraries
import React from 'react';
import { shallow } from 'enzyme';

// components
import NavBar from './index'

describe('NavBar Component', () => {
  it('should be rendered properly', () => {

    const wrapper = shallow(<NavBar />);
    expect(wrapper).toMatchSnapshot();
  });
})