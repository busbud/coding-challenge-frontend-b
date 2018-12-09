import React from 'react';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import sinon from 'sinon';
import { mount, shallow } from 'enzyme';

import { initResults, polledResults } from '../fixtures';
import Search from '../../ui/Search';

Enzyme.configure({ adapter: new Adapter() });

describe('<Search />', () => {
  it('should render properly', () => {
    const render = () => {
      shallow(<Search />);
    };
    expect(render).not.toThrow();
  });

  it('should trigger a new search on language change', () => {
    const launchSearch = sinon.spy(Search.prototype, 'launchSearch');
    const wrapper = mount(<Search />);
    expect(launchSearch.calledWith('fr', 'CAD'));
    wrapper.instance().onLanguageChange('en');
    expect(launchSearch.calledWith('en', 'CAD'));
    wrapper.unmount();
    launchSearch.restore();
  });

  it('should set new currency in state on currency change', () => {
    const wrapper = mount(<Search />);
    expect(wrapper.instance().state.currency).toBe('CAD');
    wrapper.instance().onCurrencyChange('USD');
    expect(wrapper.instance().state.currency).toBe('USD');
    wrapper.unmount();
  });

  it('should trigger a new search on currency change', () => {
    const launchSearch = sinon.spy(Search.prototype, 'launchSearch');
    const wrapper = mount(<Search />);
    expect(launchSearch.calledWith('fr', 'CAD'));
    wrapper.instance().onCurrencyChange('USD');
    expect(launchSearch.calledWith('fr', 'USD'));
    wrapper.unmount();
    launchSearch.restore();
  });

  describe('getUpdatedResults', () => {
    it('should avoid duplicate elements', () => {
      const wrapper = mount(<Search />);
      wrapper.instance().setState({ results: initResults });
      expect(wrapper.instance().state.results.departures.length).toBe(1);
      expect(wrapper.instance().state.results.operators.length).toBe(1);
      const updatedResults = wrapper.instance().getUpdatedResults(initResults);
      expect(updatedResults.departures.length).toBe(1);
      expect(updatedResults.operators.length).toBe(1);
    });

    it('should add new elements', () => {
      const wrapper = mount(<Search />);
      wrapper.instance().setState({ results: initResults });
      expect(wrapper.instance().state.results.departures.length).toBe(1);
      expect(wrapper.instance().state.results.operators.length).toBe(1);
      const updatedResults = wrapper.instance().getUpdatedResults(polledResults);
      expect(updatedResults.departures.length).toBe(2);
      expect(updatedResults.operators.length).toBe(2);
    });
  });

});
