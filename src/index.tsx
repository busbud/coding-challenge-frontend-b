import './styles.scss';

import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import store from './redux/store';
import VehiclePage from './vehicle/components/vehiclePage';

ReactDom.render(
    <React.StrictMode>
        <Provider store={store}>
            <VehiclePage />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
