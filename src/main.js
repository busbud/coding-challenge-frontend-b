import ReactDOM from 'react-dom';
import 'babel-polyfill';
import 'whatwg-fetch';

import router from './router';
import './index.html';
import './general.scss';

ReactDOM.render(router, document.getElementById('app'));
