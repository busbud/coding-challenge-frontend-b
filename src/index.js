import React from 'react';
import ReactDOM from 'react-dom';
import {SearchContainer} from './search';

function Index() {
  return <div><SearchContainer/></div>;
}

ReactDOM.render(<Index />, document.getElementById('index'));
