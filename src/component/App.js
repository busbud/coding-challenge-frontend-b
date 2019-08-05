import React from 'react';
import Search from './Search';

import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <img src='../images/osheaga.png' />
        <Search />
      </div>
    );
  }
}
