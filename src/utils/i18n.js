import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

export const initI18N = () => {


    i18n
        .use(LanguageDetector)
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            resources: {
                en: {
                    translation: {
                        "Welcome to React": "Welcome to React and react-i18next"
                    }
                },
                fr: {
                    translation: {
                        "Welcome to React": "French"
                    }
                }
            },
            lng: "en",
            fallbackLng: "en",

            interpolation: {
                escapeValue: false
            }
        });

}
