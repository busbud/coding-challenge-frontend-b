const translations = {
  resources: {
    fr: {
      translation: {
        Origin: "Depart",
        Destination: "Destination",
        Search: "Chercher",
        Passengers: "Passagers",
        Language: "Langue",
        "Departure time: {{date}}": "Heure de départ: {{date}}",
        "Arrival time: {{date}}": "Heure d'arrivée: {{date}}",
        "Location: {{location}}": "Lieu de: {{location}}",
        "Price: {{price}}": "Prix: {{price}}",
      },
    },
  },
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"],
  },
};

export default translations;
