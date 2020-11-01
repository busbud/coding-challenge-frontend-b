import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Header from './index';

export default {
  title: 'Header',
  component: Header,
};

export const BasicUsage = () => (
  <MemoryRouter initialEntries={['/']}>
    <Header
      onLangItemClick={(e) => console.log(e)}
      routes={[{ name: 'home', path: '/' }]}
      languages={['fr', 'en']}
    />
  </MemoryRouter>
);
