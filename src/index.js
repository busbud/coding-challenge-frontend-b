import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import '../node_modules/material-design-lite/material.min.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
