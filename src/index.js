import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

import './styles/base.css';
import 'typeface-montserrat';
import Dashboard from './components/Dashboard';
import Results from './components/Results';
import Header from './components/Header';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Dashboard />, document.getElementById('root'));

registerServiceWorker();
