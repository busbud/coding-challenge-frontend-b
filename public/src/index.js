import React from 'react';
import ReactDom from 'react-dom';

import { App } from './components/App.jsx';

require('./assets/stylesheets/base.scss');
require('./assets/stylesheets/departure-list.scss');

ReactDom.render( <App />, document.getElementById('app') );
