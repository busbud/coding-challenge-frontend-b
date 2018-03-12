import React from 'react';
import { shallow, render } from 'enzyme';
import SearchResults from '../component';

jest.mock('../../../components/Trip', () => ({ id, ...props }) => <div key={id} {...props} />);

const props = {
  classes: {
    root: 'fakeRootClass',
  },
  departures: [
    {
      id: '1',
      departure_time: '2018-03-10T08:30:00',
      prices: {
        total: 100,
      },
    },
    {
      id: '2',
      departure_time: '2018-03-10T07:30:00',
      prices: {
        total: 100,
      },
    },
    {
      id: '3',
      departure_time: '2018-03-10T07:30:00',
      prices: {
        total: 90,
      },
    },
    {
      id: '4',
      departure_time: '2018-03-10T06:30:00',
      prices: {
        total: 100,
      },
    },
  ],
};

describe('component | SearchResults | component', () => {
  describe('render', () => {
    it('should render without throwing and error', () => {
      // given
      const wrapper = shallow(<SearchResults {...props} />);

      // then
      expect(wrapper).toBeDefined();
    });

    it('should match snapshot', () => {
      // given
      const wrapper = shallow(<SearchResults {...props} />);

      // then
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Grid', () => {
    it('should have proper className props', () => {
      // given
      const wrapper = shallow(<SearchResults {...props} />);
      const { className } = wrapper.props();

      // then
      expect(className).toBe(props.classes.root);
    });
  });
  describe('Trips', () => {
    it('should render correct number of trip', () => {
      // given
      const wrapper = render(<SearchResults {...props} />);
      const { length } = wrapper.children();

      // then
      expect(length).toBe(4);
    });
    it('should render trips in correct order', () => {
      // given
      const wrapper = shallow(<SearchResults {...props} />);
      expect(wrapper.childAt(0).key()).toBe(props.departures[3].id);
      expect(wrapper.childAt(1).key()).toBe(props.departures[2].id);
      expect(wrapper.childAt(2).key()).toBe(props.departures[1].id);
      expect(wrapper.childAt(3).key()).toBe(props.departures[0].id);
    });
  });
});
