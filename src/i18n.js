import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
  resources: {
    English: {
      translations: {
        From: 'From',
        To: 'To',
        On: 'On',
        English: 'English',
        French: 'French'
      }
    },
    French: {
      translations: {
        From: 'de',
        To: 'à',
        On: 'sur',
        English: 'Anglais',
        French: 'Français'
      }
    },
  },
  fallbackLng: "en",
  debug: true,

  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18n;
