import React from 'react';
import {Link} from 'react-router-dom';

import './header.styles.scss';

import Logo from '../../assets/busbud-logo.svg.jsx';

const Header = () => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo />
    </Link>
  </div>
);

export default Header; 