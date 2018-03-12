import { CHANGE_LOCALE } from '../constants';
import { changeLocale } from '../actions';

describe('containers | LanguageProvider | actions', () => {
  describe('changeLocale', () => {
    it('should return correct action', () => {
      // given
      const locale = 'fakeLocale';

      // when
      const action = changeLocale(locale);
      const expected = {
        type: CHANGE_LOCALE,
        locale,
      };

      // then
      expect(action).toMatchObject(expected);
    });
  });
});
