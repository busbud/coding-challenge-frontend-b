import App from './App';
import './index.css';
import i18nInstance from './localization/i18nInstance';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';

const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18nInstance}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
