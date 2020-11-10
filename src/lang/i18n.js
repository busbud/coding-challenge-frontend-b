import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEn from "./translationEn";
import translationFr from "./translationFr";

const resources = {
  en: {
    translation: translationEn,
  },
  fr: {
    translation: translationFr,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  keySeparator: ".",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
