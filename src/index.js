import React from 'react';
import ReactDom from 'react-dom';

import { App } from './components/App.jsx';

require('./assets/stylesheets/base.scss');
require('./assets/stylesheets/departure-list.scss');
require('./assets/stylesheets/language-menu.scss');

ReactDom.render( <App />, document.getElementById('app') );
