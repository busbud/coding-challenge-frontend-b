import React, { PropTypes } from 'react';
import LangTogglerContainer from '../LangToggler/LangTogglerContainer';
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
      <header className="header">
        <h1 className="header__welcome-message">{this.props.translations.welcomeText}</h1>
        <LangTogglerContainer />
      </header>
    );
  }
}

Header.propTypes = {
    translations: PropTypes.object.isRequired
};


export default Header;