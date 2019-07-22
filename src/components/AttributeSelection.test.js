import React from 'react';
import { shallow, mount } from 'enzyme';
import AttributeSelection from './AttributeSelection';

const props = {
  getCurrentValue: () => 'CAD',
};

describe('Attribute selection component', () => {
  test('renders', () => {
    const wrapper = shallow(<AttributeSelection {...props} />);

    expect(wrapper.exists()).toBe(true);
  });
});
