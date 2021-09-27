import './styles.scss';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';

import DeparturePage from './departures/components/departurePage';
import store from './redux/store';

ReactDom.render(
    <React.StrictMode>
        <Provider store={store}>
            <DeparturePage />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
