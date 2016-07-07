import {expect} from 'chai';
import reducer from '../../../src/reducers/sort';


/* sort reducer */
describe('Redux sort reducer', () => {

   it('should return the initial state', () => {

    let reduced = reducer(undefined, {});
    expect(reduced).to.be.a('string');
    expect(reduced).to.be.equal('departureDate');
  });

   it('should switch to price', () => {

    let reduced = reducer(
      'price',
      {
        type: 'CHANGE_SORT',
        sort: 'price'
      }
    );

    expect(reduced).to.be.a('string');
    expect(reduced).to.be.equal('price');
  });


});