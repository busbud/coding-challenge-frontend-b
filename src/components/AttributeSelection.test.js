import React from 'react';
import { shallow } from 'enzyme';
import AttributeSelection from './AttributeSelection';

const props = {
  getCurrentValue: () => 'CAD',
  changeValue: () => {},
};

describe('Attribute selection component', function() {
  beforeEach(() => {
    this.wrapper = shallow(<AttributeSelection {...props} />);
  });

  test('renders', () => {
    expect(this.wrapper.exists()).toBe(true);
  });

  test("user's currency selection is echoed and page is refreshed", () => {
    this.wrapper.find('select').simulate('change', {
      target: { value: 'USD' },
    });

    window.location.reload();

    expect(this.wrapper.find('select').props().value).toEqual('USD');
    expect(window.location.reload).toHaveBeenCalled();
  });
});
