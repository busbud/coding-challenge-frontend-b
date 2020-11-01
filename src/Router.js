/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import routes from './routes';
import i18n, { resources } from './i18n';
import Header from './components/Header';
import ThemeProvider from './context/ThemeProvider';
import GlobalStyle from './components/GlobalStyle';

function AppRouter() {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isLightTheme, setIsLightTheme] = useState(true);
  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  function changeTheme(checked) {
    console.log('checked', checked);
    setIsLightTheme(!checked);
  }

  return (
    <ThemeProvider
      themeStyle={isLightTheme ? 'light' : 'dark'}
    >
      <>
        <GlobalStyle />
        <Router>
          <Header
            routes={routes}
            languages={Object.keys(resources).map((lng) => lng)}
            onLangItemClick={(e) => setCurrentLanguage(e.target.value)}
            onThemeSwitch={(e) => changeTheme(e.target.checked)}
            isLightTheme={isLightTheme}
          />
          <Switch>
            {routes.map((route) => <Route key={route} {...route} />)}
          </Switch>
        </Router>
      </>
    </ThemeProvider>
  );
}

export default AppRouter;