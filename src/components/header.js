import React from 'react';
import Img from "react-webp-image";
import logo from '../images/logo.png';
import osheaga from '../images/osheaga.png';
import logoWebp from '../images/logo.webp';
import osheagaWebp from '../images/osheaga.webp';
import '../styles/header.scss';

const Header = () => (
  <header className="header">
    <Img className="osheaga" src={osheaga} webp={osheagaWebp} alt="osheaga" />
    <p>avec</p>
    <Img className="logo" src={logo} webp={logoWebp} alt="Logo" />
  </header>
);

export default Header;
