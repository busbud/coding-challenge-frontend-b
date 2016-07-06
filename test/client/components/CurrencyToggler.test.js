import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import CurrencyToggler from '../../../src/components/CurrencyToggler/CurrencyToggler';
import shared from './shared.js'


function setup() {
    let props = {
      currency: 'CAD'
    };

    let renderer = TestUtils.createRenderer();
    renderer.render(<CurrencyToggler {...props}/>);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}

describe('CurrencyToggler Component', () => {

    //launch common tests
    shared(setup);

    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('div');
      expect(output.props.className).toBe('currency-toggler');

      let button = output.props.children;

      expect(button.type).toBe('button');
      expect(button.props.className).toBe('currency-toggler__link');
    });

    it('should have the proper event listener', () => {
      const { output, props } = setup();
      let button = output.props.children;
      expect(button.props.onClick).toBeA('function');
    });

});