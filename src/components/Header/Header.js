import React, { PropTypes } from 'react';
import LangTogglerContainer from '../LangToggler/LangTogglerContainer';
import CurrencyTogglerContainer from '../CurrencyToggler/CurrencyTogglerContainer';
import './Header.scss';

/**
 *  Component
 **/

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header className="container header">
        <img className="header__logo" src="assets/images/osheaga.png" alt="osheaga logo" />
        <h1 className="header__welcome-message">{this.props.translations.welcomeText}</h1>
        <LangTogglerContainer />
        <CurrencyTogglerContainer />
      </header>
    );
  }
}

Header.propTypes = {
    translations: PropTypes.object.isRequired
};


export default Header;