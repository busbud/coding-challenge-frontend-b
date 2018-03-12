import { CHANGE_LOCALE } from './constants';

export function changeLocale(locale) {
  return {
    type: CHANGE_LOCALE,
    locale,
  };
}
