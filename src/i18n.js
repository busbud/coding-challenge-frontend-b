import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { I18nextProvider } from "react-i18next";

i18n
.use(LanguageDetector)
.use(I18nextProvider) // passes i18n down to react-i18next
.init({
    resources: {
        en: {
            translations: {
                "It will be hot this summer in Montreal with the Osheaga festival!": "It will be hot this summer in Montreal with the Osheaga festival!",
                "Get a one-way ticket on BusBud!": "Get a one-way ticket on BusBud!",
                "Origin": "Origin",
                "Destination": "Destination",
                "Travel Date": "Travel Date",
                "Adults": "Adults",
                "Search": "Search",
                "Loading": "Loading",
                "No departures found": "No departures found"
            }
        },
        fr: {
            translations: {
                "It will be hot this summer in Montreal with the Osheaga festival!": "Il fera chaud cet été à Montréal avec le festival Osheaga!",
                "Get a one-way ticket on BusBud!": "Obtenez un aller simple sur BusBud!",
                "Origin": "Origine",
                "Destination": "Destination",
                "Travel Date": "Date de voyage",
                "Adults": "Adultes",
                "Search": "Chercher",
                "Loading": "Chargement",
                "No departures found": "Aucun départ trouvé"
            }
        }
    },
    fallbackLng: "en",
    debug: true,

    // common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we are using content as keys

    interpolation: {
        escapeValue: false, // not needed for react
        formatSeparator: ","
    },

    react: {
        wait: true
    },

    // order and from where user language should be detected
    order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

    // keys or params to lookup language from
    lookupQuerystring: 'lng',
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    lookupFromPathIndex: 0,
    lookupFromSubdomainIndex: 0,

    // cache user language on
    caches: ['localStorage', 'cookie'],
    excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

    // optional expire and domain for set cookie
    cookieMinutes: 10,
    cookieDomain: 'myDomain',

    // optional htmlTag with lang attribute, the default is:
    htmlTag: document.documentElement
});

export default i18n;
