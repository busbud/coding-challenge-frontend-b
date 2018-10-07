import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/app';

import * as serviceWorker from './serviceWorker';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faSearch,
    faMapPin,
    faLongArrowAltRight,
    faMapMarkerAlt,
    faCalendarAlt
} from '@fortawesome/free-solid-svg-icons';


library.add(faSearch, faMapPin, faLongArrowAltRight, faMapMarkerAlt, faCalendarAlt);


ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
