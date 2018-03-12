import React from 'react';
import { shallowWithIntl } from '../../../utils/react-intl-test';
import Logo from '../component';
import logo from '../logo.svg';
import messages from '../messages';

const props = {
  classes: {
    root: 'fakeRootClass',
  },
};

describe('component | Logo | component', () => {
  describe('render', () => {
    it('should render without throwing and error', () => {
      // given
      const wrapper = shallowWithIntl(<Logo {...props} />);

      // then
      expect(wrapper).toBeDefined();
    });

    it('should match snapshot', () => {
      // given
      const wrapper = shallowWithIntl(<Logo {...props} />);

      // then
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('img', () => {
    it('should have proper className props', () => {
      // given
      const wrapper = shallowWithIntl(<Logo {...props} />);
      const className = wrapper.props().className;

      // then
      expect(className).toBe(props.classes.root);
    });
    it('should have proper src props', () => {
      // given
      const wrapper = shallowWithIntl(<Logo {...props} />);
      const src = wrapper.props().src;

      // then
      expect(src).toBe(logo);
    });
    it('should have proper alt props', () => {
      // given
      const wrapper = shallowWithIntl(<Logo {...props} />);
      const alt = wrapper.props().alt;

      // then
      expect(alt).toBe(messages.alt.defaultMessage);
    });
  });
});
