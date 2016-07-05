import {expect} from 'chai';
import reducer from '../../../src/reducers/translater';


/* translater reducer */
describe('Redux translater reducer', () => {

   it('should return the initial state', () => {

    let reduced = reducer(undefined, {});

    expect(reduced).to.be.an('object');
    expect(reduced).to.have.all.keys('lang', 'translations');
    expect(reduced.translations).to.be.an('object');
    expect(reduced.translations).to.have.any.keys('welcomeText');
  });

   it('should load the french translation', () => {

    let reduced = reducer(
      {
        lang: 'en',
        translations: {}
      },
      {
        type: 'TOGGLE_LANG',
        lang: 'fr'
      }
    );

    expect(reduced).to.be.an('object');
    expect(reduced).to.have.all.keys('lang', 'translations');
    expect(reduced.translations).to.be.an('object');
    expect(reduced.translations).to.have.any.keys('welcomeText');
    expect(reduced.translations.welcomeText).to.be.equal('Bienvenue !');
  });


});