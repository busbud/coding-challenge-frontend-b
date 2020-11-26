import { init } from '../api';
import { React, ReactDOM } from './dependencies';
import { App } from './application';

init({
  apiUrl: process.env.apiUrl ?? '',
  apiToken: process.env.apiToken ?? '',
});

ReactDOM.render(<App />, document.getElementById('root'));
