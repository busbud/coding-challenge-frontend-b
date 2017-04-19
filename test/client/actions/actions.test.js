import {expect} from 'chai';
import * as actions from '../../../src/actions';

/* toggleLang action */
describe('Redux toggleLang action', () => {

  it('should toggle the language to FR', () => {
    const expectedAction = {
      type: 'TOGGLE_LANG',
      lang: 'FR'
    };
    expect(actions.toggleLang('FR')).to.deep.equal(expectedAction);
  });

  it('should toggle the language to EN', () => {
    const expectedAction = {
      type: 'TOGGLE_LANG',
      lang: 'EN'
    };
    expect(actions.toggleLang('EN')).to.deep.equal(expectedAction);
  });

});