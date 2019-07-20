import i18n from "../i18n";

import languages from "../languageList";
const { ENGLISH } = languages;

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

export function changeLanguage(language) {
  setLanguage(language);
  i18n.changeLanguage(language);
}
