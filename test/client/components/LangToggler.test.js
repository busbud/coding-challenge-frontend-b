import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import LangToggler from '../../../src/components/LangToggler/LangToggler';
import shared from './shared.js';


function setup() {
    let props = {
      lang: 'EN',
      onClick: () => {}
    };

    let renderer = TestUtils.createRenderer();
    renderer.render(<LangToggler {...props}/>);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}

describe('LangToggler Component', () => {

    //launch common tests
    shared(setup);

    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('div');
      expect(output.props.className).toBe('lang-toggler');

      let button = output.props.children;

      expect(button.type).toBe('button');
      expect(button.props.className).toBe('header-action lang-toggler__link');
    });

    it('should have the proper event listener', () => {
      const { output, props } = setup();
      let button = output.props.children;
      expect(button.props.onClick).toBeA('function');
    });

});