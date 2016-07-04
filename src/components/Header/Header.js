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
      <div className="header">
        <div className="header__welcome-message">{this.props.translations.welcomeText}</div>
        <LangTogglerContainer />
      </div>
    );
  }
}

Header.propTypes = {
    translations: PropTypes.object.isRequired
};


export default Header;