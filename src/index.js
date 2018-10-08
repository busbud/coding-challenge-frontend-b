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
    faCalendarAlt,
    faBars,
    faThLarge,
    faCheck
} from '@fortawesome/free-solid-svg-icons';


library.add(faSearch, faMapPin, faLongArrowAltRight, faMapMarkerAlt, faCalendarAlt);
library.add(faBars, faThLarge, faCheck);


ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
