import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Departure from '../../../src/components/Departure/Departure';
import shared from './shared.js';
import moment from 'moment';


function setup(props = {
      departure: {
          departure_time: moment(),
          departure_location: {},
          arrival_time: moment(),
          arrival_location: {},
          class_name: null,
          operator: { display_name: 'operator' },
          price: null
      },
      currency: 'CAD',
      lang: 'EN',
      translations: {
        select: 'Select'
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
      expect(output.props.className).toBe('departure departure--visible');

      let [ route, company, price ] = output.props.children;

      expect(route.type).toBe('div');
      expect(route.props.className).toBe('departure-route');

      expect(company.type).toBe('div');
      expect(company.props.className).toBe('departure-company');

      expect(price.type).toBe('div');
      expect(price.props.className).toBe('departure-price');

    });

   
});