import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import rootReducer from './rootReducer';
import App from './App';
import './index.scss';

const configureStore = () => {
    return createStore(
        rootReducer,
        applyMiddleware(thunkMiddleware),
    );
};

i18n.init({
    lng: 'en',
    escapeInterpolation: true,
    resources: {
        en: {
            translation: {
                language: {
                    english: 'English',
                    french: 'Français',
                },
                search: {
                    title: 'Search for bus tickets',
                    form: {
                        origin: 'Origin City',
                        destination: 'Destination City',
                        departure: 'Departure Date',
                        okButton: 'Search',
                    },
                    result: {
                        viewDetailsLink: 'View Details',
                        price: '${{amount}}',
                        departureTime: 'Leaves at <b>{{time}}</b>',
                        departureLocation: 'from <b>{{location}}</b>',
                        arrivalTime: 'Arrives at <b>{{time}}</b>',
                        arrivalLocation: 'at <b>{{location}}</b>',
                    },
                },
                404: {
                    title: '404 - Not Found',
                    description: 'The page was not found!',
                },
            }
        },
        fr: {
            translation: {
                language: {
                    english: 'English',
                    french: 'Français',
                },
                search: {
                    title: 'Rechercher des billets d\'autobus',
                    form: {
                        origin: 'Ville de départ',
                        destination: 'Ville de destination',
                        departure: 'Date de départ',
                        okButton: 'Rechercher',
                    },
                    result: {
                        viewDetailsLink: 'Voir détaux',
                        price: '{{amount}} $',
                        departureTime: 'Départ à <b>{{time}}</b>',
                        departureLocation: 'de <b>{{location}}</b>',
                        arrivalTime: 'Arrive à <b>{{time}}</b>',
                        arrivalLocation: 'à <b>{{location}}</b>',
                    },
                },
                404: {
                    title: '404 - Non trouvé',
                    description: 'La page ne fut pas trouvée!',
                },
            }
        },
    },
});

const rootElement = (
    <Provider store={configureStore()}>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </Provider>
);

ReactDOM.render(rootElement, document.getElementById('root'));
