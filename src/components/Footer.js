import React from 'react';
import '../styles/Footer.css';

import { translate, Trans } from 'react-i18next';
import i18n from '../i18n';

const Footer = () => (
  <footer className="Footer">
    <p>
      <Trans i18nKey="p.footer" >
        Made with <i className="fa fa-heart" aria-hidden="true" /> by <a href="https://github.com/danielpes">Daniel de Paula</a>
      </Trans>
    </p>
  </footer>
);

translate.setI18n(i18n);
export default translate()(Footer)  ;
