import React from 'react';
import { shallow } from 'enzyme';
import OnBoarding from '../index';

describe('pages | OnBoarding | index', () => {
  describe('render', () => {
    it('should render without throwing and error', () => {
      // given
      const wrapper = shallow(<OnBoarding />);

      // then
      expect(wrapper).toBeDefined();
    });

    it('should match snapshot', () => {
      // given
      const wrapper = shallow(<OnBoarding />);

      // then
      expect(wrapper).toMatchSnapshot();
    });
  });
});
