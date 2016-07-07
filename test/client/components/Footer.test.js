import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Footer from '../../../src/components/Footer/Footer';
import shared from './shared.js';


//setup component
function setup() {
    let props = {
      translations: {}
    };

    let renderer = TestUtils.createRenderer();
    renderer.render(<Footer {...props} />);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}

//start test for the component
describe('Footer Component', () => {

    //launch common tests
    shared(setup);

    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('footer');
      expect(output.props.className).toBe('footer');

      let [ logo, span ] = output.props.children;

      expect(logo.type).toBe('a');
      expect(logo.props.className).toBe('footer-link');

      expect(span.type).toBe('span');
      expect(span.props.className).toBe('footer__message');
      

    });


});