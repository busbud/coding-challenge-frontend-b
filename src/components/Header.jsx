import React from 'react';

import './styles/Header.scss';
import logo from '../../assets/images/osheaga.png';

function Header() {
  return (
    <div className="Header">
      <img className="Header__logo" src={logo} alt="Osheaga" />
    </div>
  );
}

export default Header;
