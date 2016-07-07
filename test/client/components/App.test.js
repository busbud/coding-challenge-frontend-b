import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import App from '../../../src/components/App/App';
import HeaderContainer from '../../../src/components/Header/HeaderContainer';
import Content from '../../../src/components/Content/Content';
import FooterContainer from '../../../src/components/Footer/FooterContainer';
import shared from './shared.js';


//setup component
function setup() {
    let props = {};

    let renderer = TestUtils.createRenderer();
    renderer.render(<App {...props} />);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}

//start test for the component
describe('App Component', () => {

    //launch common tests
    shared(setup);

    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('div');
      expect(output.props.className).toBe('app');

      let [ headerCont, contentDiv, footerCont ] = output.props.children;

      expect(headerCont.type).toBe(HeaderContainer);
      expect(contentDiv.type).toBe(Content);
      expect(footerCont.type).toBe(FooterContainer);

    });


});