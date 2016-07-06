import React, { PropTypes } from 'react';
import './Footer.scss';

/**
 *  Component
 **/

class Footer extends React.Component {
  constructor() {
    super()
  }
  render() {
    return (
      <footer className="footer">
        <img className="footer__logo" src="https://busbud-pubweb-assets.global.ssl.fastly.net/images/logos/fc7ed21.logo-post-60@2x.png" />
        <span className="footer__message">{this.props.translations.poweredBy}</span>
      </footer>
    );
  }
}

Footer.propTypes = {
  translations: PropTypes.object.isRequired
}


export default Footer;