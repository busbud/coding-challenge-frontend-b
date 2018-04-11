import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './app/app';

const initialData = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));

ReactDOM.hydrate(<App {...initialData} />, document.getElementById('app'));