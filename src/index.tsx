import './styles.less';
import './styles.scss';

import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';

import {App} from './components/app/app';
import store from './redux/store';

ReactDom.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
