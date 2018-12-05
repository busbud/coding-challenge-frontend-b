import React from 'react';
import ReactDOM from 'react-dom';
import {SearchContainer} from './search';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';

function Index() {
  return <I18nextProvider i18n={i18n}><SearchContainer/></I18nextProvider>;
}

ReactDOM.render(<Index />, document.getElementById('index'));
