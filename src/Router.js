/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/fr';
import routes from './routes';
import i18n, { resources } from './i18n';
import Header from './components/Header';
import ThemeProvider from './context/ThemeProvider';
import GlobalStyle from './components/GlobalStyle';

function AppRouter() {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const isDarkOS = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkOS);

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
    moment.locale(currentLanguage);
  }, [currentLanguage]);

  function changeTheme(checked) {
    setIsDarkTheme(checked);
  }

  useEffect(() => {
    if (isDarkOS) {
      setIsDarkTheme(true);
    } else setIsDarkTheme(false);
  }, [isDarkOS]);


  return (
    <ThemeProvider
      themeStyle={isDarkTheme ? 'dark' : 'light'}
    >
      <>
        <GlobalStyle />
        <Router>
          <Header
            currentLanguage={currentLanguage}
            routes={routes}
            languages={Object.keys(resources).map((lng) => lng)}
            onLangItemClick={(e) => setCurrentLanguage(e.target.value)}
            onThemeSwitch={(e) => changeTheme(e.target.checked)}
            isDarkTheme={isDarkTheme}
          />
          <Switch>
            {routes.map((route) => (
              <Route
                key={route}
                {...route}
                currentLanguage={currentLanguage}
              />
            ))}
          </Switch>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default AppRouter;
