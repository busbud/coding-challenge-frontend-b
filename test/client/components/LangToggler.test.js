import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import LangToggler from '../../../src/components/LangToggler/LangToggler';


function setup() {
    let props = {};

    let renderer = TestUtils.createRenderer();
    renderer.render(<LangToggler />);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}

describe('LangToggler Component', () => {


    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('div');
      expect(output.props.className).toBe('lang-toggler');

      let a = output.props.children;

      expect(a.type).toBe('a');
      expect(a.props.className).toBe('lang-toggler__link');
    });

    it('should have the proper event listener', () => {
      const { output, props } = setup();
      let a = output.props.children;
      expect(a.props.onClick).toBeA('function');
    });

});