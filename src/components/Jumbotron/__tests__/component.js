import React from 'react';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';
import Typography from 'material-ui/Typography';
import Jumbotron from '../component';
import messages from '../messages';

const props = {
  classes: {
    root: 'fakeRootClass',
  },
};

describe('component | Jumbotron | component', () => {
  describe('render', () => {
    it('should render without throwing and error', () => {
      // given
      const wrapper = shallow(<Jumbotron {...props} />);

      // then
      expect(wrapper).toBeDefined();
    });

    it('should match snapshot', () => {
      // given
      const wrapper = shallow(<Jumbotron {...props} />);

      // then
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Grid', () => {
    it('should have proper className props', () => {
      // given
      const wrapper = shallow(<Jumbotron {...props} />);
      const className = wrapper.props().className;

      // then
      expect(className).toBe(props.classes.root);
    });
  });
  describe('Typography', () => {
    it('should contains proper message', () => {
      // given
      const wrapper = shallow(<Jumbotron {...props} />);
      const formattedMessageProps = wrapper
        .find(Typography)
        .find(FormattedMessage)
        .props();

      // then
      expect(formattedMessageProps).toMatchObject(messages.title);
    });
  });
});
