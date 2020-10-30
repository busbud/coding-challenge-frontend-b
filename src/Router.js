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


function AppRouter() {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);

  return (
    <Router>
      <Header
        routes={routes}
        languages={Object.keys(resources).map((lng) => lng)}
        onLangItemClick={(e) => setCurrentLanguage(e.target.value)}
      />
      <Switch>
        {routes.map((route) => <Route key={route} {...route} />)}
      </Switch>
    </Router>
  );
}

export default AppRouter;
