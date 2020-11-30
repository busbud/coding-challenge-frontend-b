import LocalizedStrings from 'react-localization';

export const supportedLanguages = [
    {
        id: 'en',
        label: 'English',
    },
    {
        id: 'fr',
        label: 'Français',
    },
    {
        id: 'it',
        label: 'Italiano',
    },
];

export const getLanguage = () => {
    const urlLanguage = location?.pathname?.split('/')[1];
    if (!urlLanguage) {
        const browserLanguage = navigator?.language.split('-')[0];
        if (
            browserLanguage &&
            supportedLanguages.some((l) => l.id === browserLanguage)
        ) {
            return browserLanguage;
        }
        return supportedLanguages[0].id;
    }
    return urlLanguage;
};

export let contentLanguages = new LocalizedStrings({
    en: {
        search: 'Search',
        adults: 'Adults',
        departureFrom: 'Departure from',
        departureDate: 'Departure date',
        destination: 'Destination',
        noResultsFound: 'No results found',
        montreal: 'Montreal',
        quebec: 'Quebec'
    },
    fr: {
        search: 'Chercher',
        adults: 'Adultes',
        departureFrom: 'Départ de',
        departureDate: 'Date de départ',
        destination: 'Destination',
        noResultsFound: 'Aucun résultat trouvé',
        montreal: 'Montréal',
        quebec: 'Québec'
    },
    it: {
        search: 'Ricerca',
        adults: 'Adulti',
        departureFrom: 'Partenza da',
        departureDate: 'Data di partenza',
        destination: 'Destinazione',
        noResultsFound: 'Nessun risultato trovato',
        montreal: 'Montreal',
        quebec: 'Quebec'
    },
});
