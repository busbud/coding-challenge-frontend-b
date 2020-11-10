import React, { useState } from 'react';

import CurrencyContext from './contexts/currencyContext';
import Layout from './components/Layout/Layout';
import Book from './components/Book/Book';
import './App.scss';

function App() {
  const [currency, setCurrency] = useState('CAD');

  const changeCurrency = (curr) => setCurrency(curr);

  return (
    <CurrencyContext.Provider value={{ currency, changeCurrency }}>
      <Layout>
        <Book />
      </Layout>
    </CurrencyContext.Provider>
  );
}

export default App;
