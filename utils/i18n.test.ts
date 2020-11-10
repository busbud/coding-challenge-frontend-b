import { i18n } from './i18n';
import { ELanguagesKeys } from '@constants/languages';

describe('Test i18n front utility', () => {
  test('No translation node should return a translation error.', () => {
    // @ts-ignore : should error
    expect(() => i18n()).toThrow('YOU NEED A TRANSLATION NODE TO TRANSLATE.');
  });

  test('No translation node should return a translation error.', () => {
    // @ts-ignore : should error
    expect(() => i18n('hello')).toThrow(
      'THE TRANSLATION NODE NEEDS TO BE AN OBJECT.',
    );
    // @ts-ignore : should error
    expect(() => i18n([])).toThrow(
      'THE TRANSLATION NODE NEEDS TO BE AN OBJECT.',
    );
    // @ts-ignore : should error
    expect(() => i18n(null)).toThrow(
      'YOU NEED A TRANSLATION NODE TO TRANSLATE.',
    );
    // @ts-ignore : should error
    expect(() => i18n(undefined)).toThrow(
      'YOU NEED A TRANSLATION NODE TO TRANSLATE.',
    );
    // @ts-ignore : should error
    expect(() => i18n(true)).toThrow(
      'THE TRANSLATION NODE NEEDS TO BE AN OBJECT.',
    );
    // @ts-ignore : should error
    expect(() => i18n(123)).toThrow(
      'THE TRANSLATION NODE NEEDS TO BE AN OBJECT.',
    );
  });

  test('If the translation does not exists on the node, it should throw.', () => {
    expect(() =>
      i18n({
        // @ts-ignore : should error
        noEn: 'No english translation',
      }),
    ).toThrow('THERE IS NO TRANSLATION FOR THIS NODE IN en.');
  });

  test('A properly formed translation node should return the right value.', () => {
    const translatedText = i18n({
      [ELanguagesKeys.EN]: 'English translation.',
      [ELanguagesKeys.FR]: 'Traduction française.',
    });
    expect(translatedText).toBe('English translation.');
  });
});
