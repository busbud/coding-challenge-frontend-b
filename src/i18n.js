import i18next from "i18next";

i18next.init({
  resources: {
    en: {
      translations: {
        Introduction:
          "New Yorkers! Are you planning on going to Osheaga this year? Busbud has got you covered! Find the cheapest bus tickets from New York to Montreal right here!",
        destination: "From New York to Montreal",
        find: "Find tickets!",
        footer: "Made with ❤️ by Valentijn Nieman for Busbud"
      }
    },
    fr: {
      translations: {
        Introduction:
          "New yorkais! Envisagez-vous d'aller à Osheaga cette année? Busbud vous a couvert! Trouvez les billets de bus les moins chers depuis New York vers Montréal ici!",
        destination: "De New York à Montréal",
        find: "Trouvez des billets!",
        footer: "Fabriqué avec ❤️ par Valentijn Nieman pour Busbud"
      }
    }
  },
  fallbackLng: "en",
  debug: true,

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  keySeparator: false, // we use content as keys

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ","
  },

  react: {
    wait: true
  }
});

export default i18next;
