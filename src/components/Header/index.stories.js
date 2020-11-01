import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { storyWithThemeToggle } from '../../context/ThemeProvider/storyWithThemeToggle';

import Header from './index';

export default {
  title: 'Header',
  component: Header,
  decorators: [storyWithThemeToggle],
};

export const BasicUsage = () => (
  <MemoryRouter initialEntries={['/']}>
    <Header
      onLangItemClick={(e) => console.log(e)}
      routes={[{ name: 'home', path: '/' }]}
      languages={['fr', 'en']}
      isLightTheme
      onThemeSwitch={(e) => console.log(e)}
    />
  </MemoryRouter>
);
