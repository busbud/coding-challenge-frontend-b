import i18n from "i18next";
import { reactI18nextModule } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import { getCurrentLanguage } from "./services/language-service";
import languages from "./languageList";

const { ENGLISH, FRENCH } = languages;

const resources = {
  [ENGLISH]: {
    translation: {
      "Excited for an upcoming weekend at Osheaga?":
        "Excited for an upcoming weekend at Osheaga? Click below to see all departures for one adult on Aug 2nd 2019 for the following route:",
      "NYC to MTL": "New York to Montreal",
      Search: "Search"
    }
  },
  [FRENCH]: {
    translation: {
      "Excited for an upcoming weekend at Osheaga?":
        "Envie d'un week-end à Osheaga? Cliquez ci-dessous pour voir tous les départs pour un adulte le 2 août 2019 pour l'itinéraire suivant:",
      "NYC to MTL": "New York à Montréal",
      Search: "Chercher"
    }
  }
};

i18n
  .use(detector)
  .use(reactI18nextModule)
  .init({
    resources,
    lng: getCurrentLanguage(),

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
