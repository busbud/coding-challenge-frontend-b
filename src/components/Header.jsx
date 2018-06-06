import React from 'react';

import './styles/Header.scss';
import logo from '../../assets/images/osheaga.png';

export default function Header() {
  return (
    <div className="Header">
      <img src={logo} alt="Osheaga" />
    </div>
  );
}
