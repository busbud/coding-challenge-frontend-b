import i18n from "../i18n";

function setLanguage(language) {
  window.localStorage.setItem("lang", language);
}

export function getCurrentLanguage() {
  const { lang } = window.localStorage;
  return lang.substr(0, 2);
}

export function changeLanguage(language) {
  setLanguage(language);
  i18n.changeLanguage(language);
}
