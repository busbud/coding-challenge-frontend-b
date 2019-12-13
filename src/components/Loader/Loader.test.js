// third-party libraries
import React from 'react';
import { shallow } from 'enzyme';

// components
import Loader from './index'

describe('NavBar Component', () => {
  it('should be rendered properly', () => {

    const wrapper = shallow(<Loader />);
    expect(wrapper).toMatchSnapshot();
  });
})
