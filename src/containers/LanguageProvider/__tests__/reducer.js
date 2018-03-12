import reducer from '../reducer';
import { CHANGE_LOCALE } from '../constants';
import { DEFAULT_LOCALE } from '../../App/constants';

describe('containers | LanguageProvider | reducer', () => {
  it('returns the initial state', () => {
    // given
    const action = {};

    // when
    const newState = reducer(undefined, action);

    // then
    const expectedState = { locale: DEFAULT_LOCALE };
    expect(newState).toEqual(expectedState);
  });

  it('changes the locale', () => {
    // given
    const action = { type: CHANGE_LOCALE, locale: 'de' };

    // when
    const newState = reducer(undefined, action);

    // then
    const expectedState = { locale: 'de' };
    expect(newState).toEqual(expectedState);
  });
});
