import React from 'react';

function Header() {
  return (
    <header>
      <div className="header-logos">
        <img src="assets/busbud-logo.png" alt="Busbud" className="busbud-logo" />
        <span className="plus">+</span>
        <img src="assets/osheaga-logo.png" alt="Osheaga" className="osheaga-logo" />
      </div>
    </header>
  );
}

export default Header;
