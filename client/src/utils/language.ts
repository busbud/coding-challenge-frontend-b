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
    },
    fr: {
        search: 'Chercher',
    },
    it: {
        search: 'Ricerca',
    },
});
