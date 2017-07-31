import i18n from 'i18next';
import enContent from './locales/en.js';
import frContent from './locales/fr.js';

i18n
    .init({
        lng: 'en',
        fallbackLng: 'en',
        resources: {
            en: enContent,
            fr: frContent
        },

        interpolation: {
            escapeValue: false, // not needed for react!!
        },

        // react i18next special options (optional)
        react: {
            wait: false, // set to true if you like to wait for loaded in every translated hoc
            nsMode: 'default' // set it to fallback to let passed namespaces to translated hoc act as fallbacks
        }
    });


export default i18n;