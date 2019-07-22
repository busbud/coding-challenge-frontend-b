import i18n from '../i18n';

function setAttribute(type, value) {
  window.localStorage.setItem(type, value);
}

export function getCurrentLanguage() {
  const { lang } = window.localStorage;
  return lang.substr(0, 2);
}

export function changeLanguage(language) {
  setAttribute('lang', language);
  i18n.changeLanguage(language);
}

export function changeCurrency(currency) {
  setAttribute('currency', currency);
}

export function getCurrentCurrency() {
  const { currency } = window.localStorage;
  if (!currency) {
    return 'CAD';
  }
  return currency;
}
