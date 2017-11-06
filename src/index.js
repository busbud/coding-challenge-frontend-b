import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import './index.css';
import App from './App';
import stores from './stores'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={stores}>
        <App />
    </Provider>
, document.getElementById('root'));

registerServiceWorker();
