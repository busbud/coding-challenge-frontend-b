import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Content from '../../../src/components/Content/Content';
import RouteContainer from '../../../src/components/Route/RouteContainer';
import FiltersContainer from '../../../src/components/Filters/FiltersContainer';
import DeparturesListContainer from '../../../src/components/DeparturesList/DeparturesListContainer';
import shared from './shared.js';


//setup component
function setup() {
    let props = {};

    let renderer = TestUtils.createRenderer();
    renderer.render(<Content {...props} />);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}

//start test for the component
describe('Content Component', () => {

    //launch common tests
    shared(setup);

    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('section');
      expect(output.props.className).toBe('content');

      let [ routeCont, filtersCont, departuresListCont ] = output.props.children;

      expect(routeCont.type).toBe(RouteContainer);
      expect(filtersCont.type).toBe(FiltersContainer);
      expect(departuresListCont.type).toBe(DeparturesListContainer);

    });


});