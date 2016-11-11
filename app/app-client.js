import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/appRoutes.jsx';

window.onload = () => {
  ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};
