import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: {
          "Leaving From": "Leaving From",
          "Arriving At": "Arriving At",
          Submit: "Submit",
          "Here are all the results for": "Here are all the results for",
          Departs: "Departs",
          Arrives: "Arrives",
          "Buy Now": "Buy Now",
          "Designed by": "Designed by",
          "Book your bus ticket to Montreal's biggest (and hottest) concert of the summer!":
            "Book your bus ticket to Montreal's biggest (and hottest) concert of the summer!"
        }
      },
      fr: {
        translations: {
          "Leaving From": "Partir de",
          "Arriving At": "Arrivée à",
          Submit: "Soumettre",
          "Here are all the results for": "Voici tous les résultats pour",
          Departs: "Départ",
          Arrives: "Arrive",
          "Buy Now": "Acheter",
          "Designed by": "Conçu par",
          "Book your bus ticket to Montreal's biggest (and hottest) concert of the summer!":
            "Réservez votre billet de bus pour le plus grand (et le plus chaud) concert de l'été à Montréal!"
        }
      }
    },
    fallbackLng: "en",

    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false,

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
