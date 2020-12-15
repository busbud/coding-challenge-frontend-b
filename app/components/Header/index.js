import React from 'react';
import Img from './Img';
import Banner from './banner.png';

function Header() {
  return (
    <div>
      <a href="https://www.busbud.com/">
        <Img src={Banner} alt="Busbud osheaga - Logo" />
      </a>
    </div>
  );
}

export default Header;
