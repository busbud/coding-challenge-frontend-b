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
                        "Welcome to React": "Welcome to React and react-i18next",
                        "Leaving from": "Leaving from",
                        "Going to": "Going to",
                        "Departure date": "Departure date",
                        "Search": "Search",
                        "Details": "Details",
                        "Duration": "Duration",
                        "Loading": "Loading",
                        "Start Search": "Choose directions and date to find best bus trip",
                    }
                },
                fr: {
                    translation: {
                        "Welcome to React": "French",
                        "Leaving from": "Départ de",
                        "Going to": "Destination",
                        "Departure date": "Date de départ",
                        "Search": "Rechercher",
                        "Details": "Détails",
                        "Duration": "Durée",
                        "Loading": "Chargement",
                        "Start Search": "Choisissez les directions et la date pour trouver le meilleur trajet en bus",

                    }
                },
                ru: {
                    translation: {
                        "Welcome to React": "French",
                        "Leaving from": "Откуда",
                        "Going to": "Куда",
                        "Departure date": "Дата",
                        "Search": "Поиск",
                        "Details": "Детали",
                        "Duration": "Длительность",
                        "Loading": "Загрузка",
                        "Start Search": "Выберите направления и дату чтобы найти лучшую поездку на автобусе",

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
