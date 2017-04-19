import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Loader from '../../../src/components/Loader/Loader';
import shared from './shared.js';


//setup component
function setup() {
    let props = {};

    let renderer = TestUtils.createRenderer();
    renderer.render(<Loader {...props} />);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}

//start test for the component
describe('Loader Component', () => {

    //launch common tests
    shared(setup);

    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('div');
      expect(output.props.className).toBe('loader');

      let anim = output.props.children;

      expect(anim.type).toBe('div');
      expect(anim.props.className).toBe('loader__animation');

    });


});