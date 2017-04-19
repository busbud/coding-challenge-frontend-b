import {expect} from 'chai';
import reducer from '../../../src/reducers/currency';


/* currency reducer */
describe('Redux currency reducer', () => {

   it('should return the initial state', () => {

    let reduced = reducer(undefined, {});
    expect(reduced).to.be.a('string');
    expect(reduced).to.be.equal('CAD');
  });

   it('should switch to USD', () => {

    let reduced = reducer(
      'CAD',
      {
        type: 'TOGGLE_CURRENCY',
        currency: 'USD'
      }
    );

    expect(reduced).to.be.a('string');
    expect(reduced).to.be.equal('USD');
  });


});