import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DeparturesList from '../../../src/components/DeparturesList/DeparturesList';
import shared from './shared.js'


function setup(props = {
      isFetching: true,
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

      /*let loader = output.props.children.shift();

      expect(button.type).toBe('button');
      expect(button.props.className).toBe('lang-toggler__link');*/
      //@TODO
    });

    it('should display loader when fetching', () => {
      const { output, props } = setup();

      //@TODO
    });

});