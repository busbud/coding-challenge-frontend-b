import { selectLanguage, makeSelectLocale } from '../selectors';

describe('containers | LanguageProvider | selectors', () => {
  let state;

  beforeEach(() => {
    state = {
      language: {
        locale: 'en',
      },
    };
  });

  describe('selectLanguage', () => {
    it('should select language node state', () => {
      // given
      const selector = selectLanguage();

      // when
      const result = selector(state);

      // then
      const expected = {
        locale: 'en',
      };
      expect(result).toEqual(expected);
    });
  });

  describe('makeSelectLocale', () => {
    it('should select locale state', () => {
      // given
      const selector = makeSelectLocale();

      // when
      const result = selector(state);

      // then
      const expected = 'en';
      expect(result).toEqual(expected);
    });
  });
});
