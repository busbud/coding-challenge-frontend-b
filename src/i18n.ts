import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      adultTickets: "Adult",
      arrivingAt: "Arriving at {{city}}",
      availableSeats: "Available Seat(s): {{seats}}",
      beginSearch: "Let's get you to ",
      beginSearchPrompt: "Start by selecting the date you want to travel on",
      changeLanguage: "Change your language preference",
      childTickets: "Children",
      departingFrom: "Departing from {{city}}",
      departureDate: "Departure Date",
      destination: "Destination",
      errorEncoutered: "Whoops!",
      errorEncouteredPrompt:
        "Something went wrong, can you give it another try?",
      loading: "Hold on while we put on our dancing shoes...",
      origin: "Origin",
      osheaga: "Osheaga Music and Arts Festival",
      seniorTickets: "Senior",
      travelTime: "Travel Time (Approx.): {{duration}}",
      tryAgain: "Rats! We couldn't find anything",
      tryAgainPrompt: "Try changing your date range.",
    },
  },
  fr: {
    translation: {
      adultTickets: "Adulte",
      arrivingAt: "Arrivée à {{city}}",
      availableSeats: "Place(s) libres: {{seats}}",
      beginSearch: "Nous allons vous amener à",
      beginSearchPrompt:
        "Commencez par sélectionner la date à laquelle vous souhaitez voyager",
      changeLanguage: "Changer votre préférence de langue",
      childTickets: "Enfants",
      departingFrom: "Au départ de {{city}}",
      departureDate: "Date de départ",
      destination: "Destination",
      errorEncoutered: "Oups!",
      errorEncouteredPrompt:
        "Un problème est survenu, pouvez-vous essayer à nouveau?",
      loading: "Juste une minute, on s'habille... ",
      origin: "Origine",
      osheaga: "Osheaga Festival Musique et Arts",
      seniorTickets: "Sénior",
      travelTime: "Temps de trajet (approx.): {{duration}}",
      tryAgain: "Zut! Nous n'avons rien trouvé",
      tryAgainPrompt: "Essayez de changer votre plage de dates",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    interpolation: { escapeValue: false },
    keySeparator: false,
    lng: process.env.REACT_APP_DEFAULT_LANGUAGE,
    resources,
  });

// NOTE: This is one of a few exceptions this to this rule TRB 2020-11-14
// eslint-disable-next-line import/no-default-export
export default i18n;
