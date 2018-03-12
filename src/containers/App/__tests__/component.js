import React from 'react';
import { shallow } from 'enzyme';
import Snackbar from 'material-ui/Snackbar';
import messages from '../messages';
import App from '../component';

const props = {
  classes: {
    root: 'fakeRootClass',
  },
  hasError: false,
};

describe('containers | App | component', () => {
  describe('render', () => {
    it('should render without throwing and error', () => {
      // given
      const wrapper = shallow(<App {...props} />);

      // then
      expect(wrapper).toBeDefined();
    });

    it('should match snapshot', () => {
      // given
      const wrapper = shallow(<App {...props} />);

      // then
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Root', () => {
    it('should have proper className props', () => {
      // given
      const wrapper = shallow(<App {...props} />);
      const className = wrapper.props().className;

      // then
      expect(className).toBe(props.classes.root);
    });
  });

  describe('Snackbar', () => {
    it('should have proper open props', () => {
      // given
      const customProps = {
        ...props,
        hasError: true,
      };
      const wrapper = shallow(<App {...customProps} />);
      const open = wrapper.find(Snackbar).props().open;

      // then
      expect(open).toBe(true);
    });
    it('should have proper message props', () => {
      // given
      const wrapper = shallow(<App {...props} />);
      const message = wrapper.find(Snackbar).props().message.props;

      // then
      expect(message).toMatchObject(messages.error_content);
    });
  });
});
