import LocalizedStrings from 'react-localization';

const Strings = new LocalizedStrings({
  en: {
    travelItinerary: 'Travel itinerary',
    leavingFrom: 'Leaving from:',
    goingTo: 'Going to:',
    date: 'Date:',
    numberOfPassengers: 'Number of passengers',
    search: 'Search',
    switchLanguage: 'Français',
    availableTrips: 'Available trips:'
  },
  fr: {
    travelItinerary: 'Itinéraire de voyage',
    leavingFrom: 'Origine: ',
    goingTo: 'Destination: ',
    date: 'Date:',
    numberOfPassengers: 'Nombre de passagers',
    search: 'Rechercher',
    switchLanguage: 'English',
    availableTrips: 'Transport disponibles:'
  }
});

export default Strings;