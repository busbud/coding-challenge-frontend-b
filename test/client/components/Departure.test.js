import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Departure from '../../../src/components/Departure/Departure';
import shared from './shared.js'


function setup(props = {
      departure: {
        prices: { total : 42 }
      }
    }) {

    let renderer = TestUtils.createRenderer();
    renderer.render(<Departure {...props}/>);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}

describe('Departure Component', () => {

    //launch common tests
    shared(setup);

    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('div');
      expect(output.props.className).toBe('departure');

      /*let loader = output.props.children.shift();

      expect(button.type).toBe('button');
      expect(button.props.className).toBe('lang-toggler__link');*/
      //@TODO
    });

   
});