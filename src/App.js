import 'mapbox-gl/dist/mapbox-gl.css';
import './services/i18n';

import React from 'react';
import { BaseCSS } from 'styled-bootstrap-grid';

import SearchPage from './pages/SearchPage';

function App() {
  return (
    <>
      <BaseCSS />
      <SearchPage />
    </>
  );
}

export default App;
