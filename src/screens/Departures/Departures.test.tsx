import React from 'react';
import ReactDOM from 'react-dom';
import Departures from './Departures';

it('Departures - renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Departures />, div);
  ReactDOM.unmountComponentAtNode(div);
});
