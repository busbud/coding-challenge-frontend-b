import { init } from '@root/api';
import { React, ReactDOM } from './dependencies';
import { App } from './application';

const _apiUrl = apiUrl ?? '';
const _apiToken = apiToken ?? '';

init({
  apiUrl: _apiUrl,
  apiToken: _apiToken,
});

ReactDOM.render(<App />, document.getElementById('root'));
