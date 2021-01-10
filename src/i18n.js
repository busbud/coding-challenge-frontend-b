import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      headerTitle: "Please stay safe.<br /> Travel responsibly.",
      headerSubtitle:
        "We miss connecting you with the world. During these times we remain dedicated to helping you travel safely.",
      originCity: "Origin City",
      origin: "Origin",
      destinationCity: "Destination City",
      destination: "Destination",
      passengers: "Passengers",
      adult: "adult",
      outboundDate: "Outbound Date",
      search: "Search",
      departuresFound: "Departures found",
      departuresSearchMessage: "Searching for departures...",
      departuresNotFoundMessage:
        "Sorry, we didn't found departures for your search",
      departuresErrorMessage:
        "Something went wrong! Please try your search again.",
    },
  },
  fr: {
    translation: {
      headerTitle:
        "Veuillez rester prudent.<br /> Voyagez de manière responsable.",
      headerSubtitle:
        "Nous manquons de vous connecter avec le monde. Pendant ces périodes, nous restons déterminés à vous aider à voyager en toute sécurité.",
      originCity: "Ville d'origine",
      origin: "Origine",
      destinationCity: "Ville de destination",
      destination: "Destination",
      passengers: "Passagers",
      adult: "adulte",
      outboundDate: "Date de sortie",
      search: "Chercher",
      departuresFound: "Départs trouvés",
      departuresSearchMessage: "Recherche de départs ...",
      departuresNotFoundMessage:
        "Désolé, nous n'avons pas trouvé de départs pour votre recherche",
      departuresErrorMessage:
        "Un problème est survenu! S'il vous plaît, réessayez.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
