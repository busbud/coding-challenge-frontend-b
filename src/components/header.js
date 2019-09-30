import React from 'react';
import '../styles/header.scss';
import logo from '../images/logo.webp';
import osheaga from '../images/osheaga.webp';


const Header = () => (
  <header className="header">
    <img className="osheaga" src={osheaga} alt="osheaga" />
    <p>avec</p>
    <img className="logo" src={logo} alt="Logo" />
  </header>
);

export default Header;
