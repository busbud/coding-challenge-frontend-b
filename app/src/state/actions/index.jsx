import { SET_LOCALE } from "./action-types";

export const setLocale = (locale) => ({
  type: SET_LOCALE,
  locale: locale,
});
