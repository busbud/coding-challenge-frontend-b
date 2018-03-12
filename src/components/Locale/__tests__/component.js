import React from 'react';
import { shallow, render } from 'enzyme';
import Locale from '../component';

const props = {
  code: 'en',
  onClick: jest.fn(),
};

describe('component | Locale | component', () => {
  describe('render', () => {
    it('should render without throwing and error', () => {
      // given
      const wrapper = shallow(<Locale {...props} />);

      // then
      expect(wrapper).toBeDefined();
    });

    it('should match snapshot', () => {
      // given
      const wrapper = shallow(<Locale {...props} />);

      // then
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Locale', () => {
    it('should have proper key', () => {
      // given
      const wrapper = shallow(<Locale {...props} />);
      const key = wrapper.key();

      // then
      expect(key).toBe(props.code);
    });
    it('should have proper innerText', () => {
      // given
      const wrapper = render(<Locale {...props} />);
      const text = wrapper.text();

      // then
      expect(text).toBe(props.code);
    });
    it('should call onClick prop function with proper params', () => {
      // given
      const wrapper = shallow(<Locale {...props} />);

      // when
      wrapper.simulate('click');

      // then
      expect(props.onClick).toHaveBeenCalledWith(props.code);
    });
  });
});
