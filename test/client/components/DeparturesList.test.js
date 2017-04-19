import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DeparturesList from '../../../src/components/DeparturesList/DeparturesList';
import Loader from '../../../src/components/Loader/Loader';
import shared from './shared.js';


function setup(props = {
      isFetching: false,
      data: {}
    }) {

    let renderer = TestUtils.createRenderer();
    renderer.render(<DeparturesList {...props}/>);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}

describe('DeparturesList Component', () => {

    //launch common tests
    shared(setup);

    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('div');
      expect(output.props.className).toBe('departures-list');

      let [ emptyDepartures, loader ] = output.props.children;

      expect(emptyDepartures.length).toBe(0);
      expect(loader).toBe(null);

    });

    it('should display loader when fetching', () => {
      const { output } = setup({
        isFetching: true,
        data: {}
      });

      expect(output.type).toBe('div');
      expect(output.props.className).toBe('departures-list');

      let [ emptyDepartures, loader ] = output.props.children;

      expect(emptyDepartures.length).toBe(0);
      expect(loader.type).toBe(Loader);
    });

});