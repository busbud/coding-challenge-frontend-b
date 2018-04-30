import React from 'react';
import logo from '../images/busbudLogo.png';

const AppHead = () => {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Get to Osheaga!</h1>
      </header>
      <p className="App-subheader">
        Find buses from New York to Montréal on August 2nd, 2018:
      </p>
    </div>
  );
};

export default AppHead;
