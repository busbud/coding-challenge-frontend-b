import React from 'react';

import DeparturesContainer from './DeparturesContainer';
import Footer from './Footer';
import Header from './Header';
import Layout from './Layout';

import './styles/App.scss';

const NEWYORK_GEOHASH = 'dr5reg';
const MONTREAL_GEOHASH = 'f25dvk';
const FESTIVAL_DATE = '2018-08-02';

function App() {
  return (
    <div className="App">
      <Layout>
        <Header />

        <div className="slogan">From New-york to Montreal Osheaga</div>

        <DeparturesContainer
          origin={NEWYORK_GEOHASH}
          destination={MONTREAL_GEOHASH}
          outboundDate={FESTIVAL_DATE}
        />

        <Footer />
      </Layout>
    </div>
  );
}

export default App;
