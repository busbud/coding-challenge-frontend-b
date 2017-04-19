import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Filters from '../../../src/components/Filters/Filters';
import { sortTypes } from '../../../src/actions';
import shared from './shared.js';


function setup(props = {
      translations: {
        sortBy: 'Classer par',
        sortBydepartureDate: 'Heure de départ',
        sortByprice: 'Prix',
        sortBycompany: 'Compagnie de bus'
      },
      sort: 'departureDate',
      onClick: () => {}
    }) {

    let renderer = TestUtils.createRenderer();
    renderer.render(<Filters {...props}/>);
    let output = renderer.getRenderOutput();

    return {
        props,
        output,
        renderer
    };
}

describe('Filters Component', () => {

    //launch common tests
    shared(setup);

    it('should render correctly', () => {
      const { output } = setup();

      expect(output.type).toBe('div');
      expect(output.props.className).toBe('filters');

      let [ span ] = output.props.children;

      expect(span.type).toBe('span');
      expect(span.props.className).toBe('filters__label');

    });

    it('should load all the types', () => {
      const { output } = setup();

      let [ span, buttons ] = output.props.children;

      expect(span.type).toBe('span');
      expect(span.props.className).toBe('filters__label');

      expect(buttons.length).toBe(sortTypes.length);


    });

   
});