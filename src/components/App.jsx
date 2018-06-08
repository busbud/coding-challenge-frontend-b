import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

import DeparturesContainer from './DeparturesContainer';
import Footer from './Footer';
import Header from './Header';
import Layout from './Layout';
import LocaleSwitch from './LocaleSwitch';

import './styles/App.scss';

const NEWYORK_GEOHASH = 'dr5reg';
const MONTREAL_GEOHASH = 'f25dvk';
const FESTIVAL_DATE = '2018-08-02';

function App(props) {
  const { i18n, t } = props;
  const currentLanguage = i18n.language;

  return (
    <div className="App">
      <Layout>
        <LocaleSwitch />
        <Header />

        <h1 className="App__slogan">{t('slogan')}</h1>

        <DeparturesContainer
          origin={NEWYORK_GEOHASH}
          destination={MONTREAL_GEOHASH}
          outboundDate={FESTIVAL_DATE}
          language={currentLanguage}
        />

        <Footer />
      </Layout>
    </div>
  );
}

App.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate('translations')(App);
