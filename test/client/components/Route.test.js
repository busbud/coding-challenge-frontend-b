import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Route from '../../../src/components/Route/Route';
import shared from './shared.js';


//setup component
function setup() {
    let props = {
      translations: {},
      data: {}
    };

    let renderer = TestUtils.createRenderer();
    renderer.render(<Route {...props} />);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}

//start test for the component
describe('Route Component', () => {

    //launch common tests
    shared(setup);

    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('div');
      expect(output.props.className).toBe('route');

      //test all 3 items
      output.props.children.map((item) => {
        expect(item.type).toBe('div');
        expect(item.props.className).toBe('route-item');
        expect(item.props.children.length).toBe(2);
      });


    });


});