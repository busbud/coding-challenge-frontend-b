import i18n from "../i18n";

import languages from "../languageList";

const { ENGLISH, FRENCH } = languages;

function setLanguage(language) {
  window.localStorage.setItem("lang", language);
}

export function getCurrentLanguage() {
  const { lang } = window.localStorage;
  if (!lang) {
    return ENGLISH;
  }
  return lang;
}

export function changeLanguage() {
  const lang = getCurrentLanguage();

  if (lang === ENGLISH) {
    setLanguage(FRENCH);
    i18n.changeLanguage(FRENCH);
    return;
  }

  setLanguage(ENGLISH);
  i18n.changeLanguage(ENGLISH);
}

export function currentLanguageDisplay() {
  const lang = getCurrentLanguage();
  if (lang === ENGLISH) return FRENCH.toUpperCase();
  return ENGLISH.toUpperCase();
}
