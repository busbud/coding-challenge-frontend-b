import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Header from '../../../src/components/Header/Header';
import LangTogglerContainer from '../../../src/components/LangToggler/LangTogglerContainer';
import shared from './shared.js';


//setup component
function setup() {
    let props = {
      translations: {}
    };

    let renderer = TestUtils.createRenderer();
    renderer.render(<Header {...props} />);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}

//start test for the component
describe('Header Component', () => {

    //launch common tests
    shared(setup);

    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('header');
      expect(output.props.className).toBe('container header');

      let [ img, h1, langToggler ] = output.props.children;

      expect(img.type).toBe('img');
      expect(img.props.className).toBe('header__logo');

      expect(h1.type).toBe('h1');
      expect(h1.props.className).toBe('header__welcome-message');

      expect(langToggler.type).toBe(LangTogglerContainer);
    });


});