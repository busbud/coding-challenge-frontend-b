import React from 'react';

import Footer from './Footer';
import Header from './Header';
import Layout from './Layout';

import './styles/App.scss';

export default function App() {
  return (
    <div className="App">
      <Layout>
        <Header />

        <div className="slogan">From New-york to Montreal Osheaga</div>

        <Footer />
      </Layout>
    </div>
  );
}
