import React from 'react';
import { shallow } from 'enzyme';
import Header from '../component';
import Grid from 'material-ui/Grid';
import Toolbar from 'material-ui/Toolbar';

const props = {
  classes: {
    root: 'fakeRootClass',
    toolbar: 'fakeToolbarClass',
    item: 'fakeItemClass',
  },
};

describe('component | Header | component', () => {
  describe('render', () => {
    it('should render without throwing and error', () => {
      // given
      const wrapper = shallow(<Header {...props} />);

      // then
      expect(wrapper).toBeDefined();
    });

    it('should match snapshot', () => {
      // given
      const wrapper = shallow(<Header {...props} />);

      // then
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('AppBar', () => {
    it('should have proper className props', () => {
      // given
      const wrapper = shallow(<Header {...props} />);
      const className = wrapper.props().className;

      // then
      expect(className).toBe(props.classes.root);
    });
  });

  describe('Toolbar', () => {
    it('should have proper className props', () => {
      // given
      const wrapper = shallow(<Header {...props} />);
      const className = wrapper.find(Toolbar).props().className;

      // then
      expect(className).toBe(props.classes.toolbar);
    });
  });

  describe('Grid', () => {
    describe('container', () => {
      it('should have proper className props', () => {
        // given
        const wrapper = shallow(<Header {...props} />);
        const className = wrapper.findWhere(node => node.type() === Grid && node.props().container === true).props()
          .className;

        // then
        expect(className).toBe(props.classes.root);
      });
    });

    describe('item', () => {
      it('should have proper className props', () => {
        // given
        const wrapper = shallow(<Header {...props} />);
        const className = wrapper.findWhere(node => node.type() === Grid && node.props().item === true).props()
          .className;

        // then
        expect(className).toBe(props.classes.item);
      });
    });
  });
});
